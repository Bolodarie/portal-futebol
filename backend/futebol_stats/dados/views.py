from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserRegistrationSerializer
from django.shortcuts import get_object_or_404
from .models import FavoritosJogador
from .serializers import FavoritosJogadorSerializer, FavoritosJogadorCreateSerializer
from rest_framework.views import APIView
from .models import FavoritosTime
from .serializers import FavoritosTimeSerializer

class UserRegistrationView(generics.CreateAPIView):
    """
    View de API para o registro de novos usuários.
    Permite a criação de um novo usuário através de uma requisição POST.
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [] # Permite acesso sem autenticação para o registro

    def post(self, request, *args, **kwargs):
        """
        Sobrescreve o método POST para adicionar uma mensagem de sucesso personalizada.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True) # Valida os dados, levanta exceção se inválido
        self.perform_create(serializer) # Chama o método create do serializer
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"message": "Usuário registrado com sucesso!", "user_id": serializer.instance.id},
            status=status.HTTP_201_CREATED,
            headers=headers
        )
    
class FavoritosJogadorListView(generics.ListAPIView):
    """Lista todos os favoritos do usuário logado"""
    serializer_class = FavoritosJogadorSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return FavoritosJogador.objects.filter(IdUsuario=self.request.user)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def adicionar_favorito(request):
    """Adiciona um jogador aos favoritos"""
    serializer = FavoritosJogadorCreateSerializer(data=request.data)
    
    if serializer.is_valid():
        IdJogador = serializer.validated_data['IdJogador']
        Nome = serializer.validated_data['Nome']
        Nacionalidade = serializer.validated_data.get('Nacionalidade', '')
        Posicao = serializer.validated_data.get('Posicao', '')
        
        # Verifica se já existe nos favoritos
        if FavoritosJogador.objects.filter(
            IdUsuario=request.user, 
            IdJogador=IdJogador
        ).exists():
            return Response(
                {'error': 'Jogador já está nos favoritos'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Cria o favorito
        favorito = FavoritosJogador.objects.create(
            IdUsuario=request.user,
            IdJogador=IdJogador,
            Nome=Nome,
            Nacionalidade=Nacionalidade,
            Posicao=Posicao
        )
        
        response_serializer = FavoritosJogadorSerializer(favorito)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remover_favorito(request, jogador_id):
    """Remove um jogador dos favoritos"""
    try:
        favorito = FavoritosJogador.objects.get(
            IdUsuario=request.user,
            IdJogador=jogador_id
        )
        favorito.delete()
        return Response({'message': 'Favorito removido com sucesso'}, status=status.HTTP_200_OK)
    except FavoritosJogador.DoesNotExist:
        return Response(
            {'error': 'Favorito não encontrado'}, 
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verificar_favorito(request, jogador_id):
    """Verifica se um jogador está nos favoritos"""
    is_favorite = FavoritosJogador.objects.filter(
        IdUsuario=request.user,
        IdJogador=jogador_id
    ).exists()
    
    return Response({'is_favorite': is_favorite})

class FavoritosTimeAPIView(APIView):
    """
    API para gerenciar os times favoritos de um usuário.
    """
    permission_classes = [IsAuthenticated] # Garante que apenas usuários logados acessem

    def post(self, request, *args, **kwargs):
        """
        Adiciona um time aos favoritos do usuário logado.
        Espera no corpo da requisição: { "IdTime": 123, "Nome": "Nome do Time", "Pais": "País do Time" }
        """
        serializer = FavoritosTimeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FavoritoTimeDetailAPIView(APIView):
    """
    API para remover um time favorito específico.
    """
    permission_classes = [IsAuthenticated]

    def delete(self, request, time_id, *args, **kwargs):
        """
        Remove um time dos favoritos do usuário logado com base no ID do time.
        """
        try:
            favorito = FavoritosTime.objects.get(IdUsuario=request.user, IdTime=time_id)
            favorito.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except FavoritosTime.DoesNotExist:
            return Response({"error": "Time favorito não encontrado."}, status=status.HTTP_404_NOT_FOUND)