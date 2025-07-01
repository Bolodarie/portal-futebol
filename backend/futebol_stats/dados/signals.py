from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import PerfilUsuario

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    """
    Cria um PerfilUsuario quando um novo objeto User é salvo.
    'created' é True se o User foi recém-criado.
    """
    if created:
        PerfilUsuario.objects.create(user=instance)
    # Se você tivesse campos no PerfilUsuario que precisam ser atualizados
    # quando o User é salvo (mesmo que não seja uma criação), você faria isso aqui.
    # Exemplo: instance.perfilusuario.save()