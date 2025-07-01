# authentication/backends.py
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User
from django.db.models import Q

class EmailBackend(ModelBackend):
    """
    Backend personalizado para permitir login com email
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # Tentar encontrar usuário por email ou username
            user = User.objects.get(
                Q(email=username) | Q(username=username)
            )
            
            # Verificar senha
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            # Executar hash da senha mesmo quando usuário não existe
            # para evitar timing attacks
            User().set_password(password)
            return None
        except User.MultipleObjectsReturned:
            # Se houver múltiplos usuários com o mesmo email
            return None
        
        return None
    
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None