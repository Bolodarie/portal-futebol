from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin # Importa o UserAdmin padrão
from django.contrib.auth.models import User # Importa o modelo User do Django
from .models import PerfilUsuario, FavoritosTime, FavoritosJogador, FavoritosCompeticao

# Registra seus modelos Favoritos para que apareçam no admin
admin.site.register(FavoritosTime)
admin.site.register(FavoritosJogador)
admin.site.register(FavoritosCompeticao)

# Define um inline para o PerfilUsuario.
# Isso permite que o PerfilUsuario seja editado diretamente na página de edição do User.
class PerfilUsuarioInline(admin.StackedInline): # Use StackedInline para uma exibição vertical
    model = PerfilUsuario
    can_delete = False # Impede que o perfil seja deletado independentemente do usuário
    verbose_name_plural = 'perfil' # Nome que aparecerá na seção do admin

# Estende o UserAdmin padrão do Django para incluir o PerfilUsuario inline.
class UserAdmin(BaseUserAdmin):
    inlines = (PerfilUsuarioInline,) # Adiciona o inline à lista de inlines do UserAdmin

# Desregistra o UserAdmin padrão do Django e registra o seu UserAdmin personalizado.
# Isso é necessário para que a sua versão personalizada do UserAdmin seja utilizada.
admin.site.unregister(User)
admin.site.register(User, UserAdmin)