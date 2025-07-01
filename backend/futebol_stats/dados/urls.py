from django.urls import path
from .views import UserRegistrationView
from . import views
from .views import FavoritosTimeAPIView, FavoritoTimeDetailAPIView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('favoritos/', views.FavoritosJogadorListView.as_view(), name='favoritos-list'),
    path('favoritos/adicionar/', views.adicionar_favorito, name='adicionar-favorito'),
    path('favoritos/remover/<int:jogador_id>/', views.remover_favorito, name='remover-favorito'),
    path('favoritos/verificar/<int:jogador_id>/', views.verificar_favorito, name='verificar-favorito'),
    path('favoritos/teams/adicionar/', FavoritosTimeAPIView.as_view(), name='favorite-teams-list-create'),
    path('favorites/teams/<int:time_id>/', FavoritoTimeDetailAPIView.as_view(), name='favorite-team-detail'),
]
