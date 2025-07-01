from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class Command(BaseCommand):
    help = 'Criar tokens para usuários existentes que não possuem'

    def handle(self, *args, **options):
        users_without_token = User.objects.filter(auth_token__isnull=True)
        created_count = 0
        
        for user in users_without_token:
            Token.objects.create(user=user)
            created_count += 1
            
        self.stdout.write(
            self.style.SUCCESS(f'{created_count} tokens criados com sucesso')
        )