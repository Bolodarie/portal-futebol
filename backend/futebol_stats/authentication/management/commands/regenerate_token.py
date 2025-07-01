from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class Command(BaseCommand):
    help = 'Regenerar token para um usuário específico'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='Username do usuário')

    def handle(self, *args, **options):
        username = options['username']
        
        try:
            user = User.objects.get(username=username)
            
            # Excluir token existente se houver
            try:
                user.auth_token.delete()
            except Token.DoesNotExist:
                pass
            
            # Criar novo token
            new_token = Token.objects.create(user=user)
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'Token regenerado para {username}: {new_token.key}'
                )
            )
            
        except User.DoesNotExist:
            self.stdout.write(
                self.style.ERROR(f'Usuário {username} não encontrado')
            )