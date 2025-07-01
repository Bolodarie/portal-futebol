from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserRegistrationSerializer

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