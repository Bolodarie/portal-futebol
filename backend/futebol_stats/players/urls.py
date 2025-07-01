from django.urls import path
from .views import PlayerDetailView

urlpatterns = [
    path('<int:player_id>/', PlayerDetailView.as_view(), name='player-detail'),
]
