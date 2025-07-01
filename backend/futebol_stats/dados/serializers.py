from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import transaction # Importa transaction para garantir atomicidade

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