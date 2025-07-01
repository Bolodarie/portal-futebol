from django.db import models
from django.conf import settings # Importa as configurações para AUTH_USER_MODEL

# O modelo User do Django já possui campos para username, email, password,
# is_staff (acesso ao admin) e is_superuser (admin completo).
# Portanto, seu campo 'Tipo' não é mais necessário aqui.

class PerfilUsuario(models.Model):
    """
    Modelo para armazenar informações adicionais do usuário que não estão
    no modelo User padrão do Django.
    Possui uma relação OneToOneField com o modelo User.
    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        db_table = 'PerfilUsuario' # Nome da tabela no banco de dados
        verbose_name = 'Perfil do Usuário'
        verbose_name_plural = 'Perfis dos Usuários'

    def __str__(self):
        return f'Perfil de {self.user.username}'

# Tabela de FavoritosTime
class FavoritosTime(models.Model):
    """
    Modelo para armazenar os times favoritos de um usuário.
    A chave estrangeira IdUsuario agora aponta para o modelo User do Django.
    """
    # Id INTEGER PRIMARY KEY é criado automaticamente pelo Django como 'id'
    # A chave estrangeira aponta para o modelo User do Django.
    # db_column='IdUsuario' mapeia para o nome da coluna existente no seu banco de dados.
    IdUsuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, db_column='IdUsuario')
    IdTime = models.IntegerField(null=False) # Assumindo que IdTime é um ID externo

    class Meta:
        db_table = 'FavoritosTime'
        # Restrição para evitar duplicatas (IdUsuario, IdTime)
        unique_together = ('IdUsuario', 'IdTime')
        verbose_name = 'Time Favorito'
        verbose_name_plural = 'Times Favoritos'

    def __str__(self):
        return f"Usuário: {self.IdUsuario.username} - Time ID: {self.IdTime}"

# Tabela de FavoritosJogador
class FavoritosJogador(models.Model):
    """
    Modelo para armazenar os jogadores favoritos de um usuário.
    A chave estrangeira IdUsuario agora aponta para o modelo User do Django.
    """
    # Id INTEGER PRIMARY KEY é criado automaticamente pelo Django como 'id'
    # A chave estrangeira aponta para o modelo User do Django.
    IdUsuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, db_column='IdUsuario')
    IdJogador = models.IntegerField(null=False) # Assumindo que IdJogador é um ID externo
    Nome = models.CharField(max_length=255, null=False)
    Nacionalidade = models.CharField(max_length=100, blank=True, null=True)
    Posicao = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = 'FavoritosJogador'
        # Restrição para evitar duplicatas (IdUsuario, IdJogador)
        unique_together = ('IdUsuario', 'IdJogador')
        verbose_name = 'Jogador Favorito'
        verbose_name_plural = 'Jogadores Favoritos'

    def __str__(self):
        return f"Usuário: {self.IdUsuario.username} - Jogador: {self.Nome}"

# Tabela de FavoritosCompeticao
class FavoritosCompeticao(models.Model):
    """
    Modelo para armazenar as competições favoritas de um usuário.
    A chave estrangeira IdUsuario agora aponta para o modelo User do Django.
    """
    # Id INTEGER PRIMARY KEY é criado automaticamente pelo Django como 'id'
    # A chave estrangeira aponta para o modelo User do Django.
    IdUsuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, db_column='IdUsuario')
    IdCampeonato = models.IntegerField(null=False) # Assumindo que IdCampeonato é um ID externo
    Nome = models.CharField(max_length=255, null=False)
    Pais = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = 'FavoritosCompeticao'
        # Restrição para evitar duplicatas (IdUsuario, IdCampeonato)
        unique_together = ('IdUsuario', 'IdCampeonato')
        verbose_name = 'Competição Favorita'
        verbose_name_plural = 'Competições Favoritas'

    def __str__(self):
        return f"Usuário: {self.IdUsuario.username} - Competição: {self.Nome}"