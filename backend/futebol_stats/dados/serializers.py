from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import transaction # Importa transaction para garantir atomicidade
from .models import FavoritosJogador
from .models import FavoritosTime
from django.contrib.auth import get_user_model

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer para o registro de novos usuários.
    Inclui validações para nome, email e senha.
    """
    name = serializers.CharField(write_only=True, required=True, max_length=255) # Campo para o nome completo
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, min_length=6)

    class Meta:
        model = User
        # Campos que serão esperados na entrada e retornados na saída
        fields = ('name', 'email', 'password')
        # Campos que são apenas para escrita (não serão retornados na resposta GET)
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_email(self, value):
        """
        Valida se o email já existe.
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este e-mail já está em uso.")
        return value

    def create(self, validated_data):
        """
        Cria um novo usuário e seu perfil associado.
        Usa transaction.atomic para garantir que ambas as operações (User e PerfilUsuario)
        sejam bem-sucedidas ou nenhuma seja.
        """
        # Remove o campo 'name' temporariamente, pois ele não faz parte do modelo User
        name = validated_data.pop('name')
        email = validated_data['email']
        password = validated_data['password']

        try:
            with transaction.atomic():
                # Cria o usuário. Django irá hashear a senha automaticamente.
                user = User.objects.create_user(
                    username=email, # Usamos o email como username, pois é único
                    email=email,
                    password=password,
                    first_name=name # O nome completo pode ir para first_name ou ser dividido
                )
                # O sinal post_save em dados/signals.py cuidará da criação do PerfilUsuario.
                # Se você tivesse campos adicionais no PerfilUsuario que precisam ser preenchidos
                # no momento do cadastro, você faria isso aqui:
                # PerfilUsuario.objects.create(user=user, campo_extra=valor_do_campo)

            return user
        except Exception as e:
            raise serializers.ValidationError(f"Erro ao criar o usuário: {e}")
        
class FavoritosJogadorSerializer(serializers.ModelSerializer):
    # Campos para exibição
    usuario_nome = serializers.CharField(source='IdUsuario.username', read_only=True)
    
    class Meta:
        model = FavoritosJogador
        fields = ['id', 'IdJogador', 'Nome', 'Nacionalidade', 'Posicao', 'usuario_nome']
        read_only_fields = ['id', 'usuario_nome']
    
    def create(self, validated_data):
        # Adiciona o usuário atual na criação
        validated_data['IdUsuario'] = self.context['request'].user
        return super().create(validated_data)

class FavoritosJogadorCreateSerializer(serializers.Serializer):
    IdJogador = serializers.IntegerField()
    Nome = serializers.CharField(max_length=255)
    Nacionalidade = serializers.CharField(max_length=100, required=False, allow_blank=True)
    Posicao = serializers.CharField(max_length=100, required=False, allow_blank=True)       

class FavoritosTimeSerializer(serializers.ModelSerializer):
    # O IdUsuario será preenchido automaticamente com base no usuário autenticado (requisição)
    # Por isso, usamos `ReadOnlyField` para garantir que ele não seja enviado no corpo da requisição.
    IdUsuario = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = FavoritosTime
        fields = ['IdUsuario', 'IdTime', 'Nome', 'Pais']

    def create(self, validated_data):
        # Associa o usuário da requisição ao criar o favorito
        validated_data['IdUsuario'] = self.context['request'].user
        try:
            # `unique_together` já impede a criação, mas aqui garantimos uma mensagem clara.
            instance = FavoritosTime.objects.create(**validated_data)
            return instance
        except Exception as e:
            raise serializers.ValidationError({"detail": f"Erro ao criar favorito: {e}"})
 