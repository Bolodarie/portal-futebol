from django.apps import AppConfig

class DadosConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'dados'

    def ready(self):
        # Importa os sinais quando a aplicação está pronta.
        # Isso garante que os receivers (como create_or_update_user_profile) sejam conectados.
        import dados.signals