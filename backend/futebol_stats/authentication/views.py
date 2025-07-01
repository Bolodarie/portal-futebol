# views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import json

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    View para login do usuário usando Token Authentication
    """
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return Response({
                'message': 'Email e senha são obrigatórios'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Autenticar usuário (por email)
        try:
            user = User.objects.get(email=email)
            if not user.check_password(password):
                user = None
        except User.DoesNotExist:
            user = None
        
        if user is None:
            return Response({
                'message': 'Credenciais inválidas'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        if not user.is_active:
            return Response({
                'message': 'Conta desativada'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        # Obter ou criar token para o usuário
        token, created = Token.objects.get_or_create(user=user)
        
        # Dados do usuário para retornar
        user_data = {
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }
        
        return Response({
            'token': token.key,
            'user': user_data,
            'message': 'Login realizado com sucesso'
        }, status=status.HTTP_200_OK)
        
    except json.JSONDecodeError:
        return Response({
            'message': 'Dados inválidos'
        }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({
            'message': 'Erro interno do servidor'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    View para logout (excluir token)
    """
    try:
        # Excluir o token do usuário atual
        request.user.auth_token.delete()
        
        return Response({
            'message': 'Logout realizado com sucesso'
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'message': 'Erro ao fazer logout'
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    """
    View para obter dados do usuário autenticado
    """
    user = request.user
    user_data = {
        'id': user.id,
        'email': user.email,
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'date_joined': user.date_joined,
        'is_staff': user.is_staff,
    }
    
    return Response(user_data, status=status.HTTP_200_OK)