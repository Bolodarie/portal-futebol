from django.urls import path
from .views import MatchesTodayView, MatchInfoView

urlpatterns = [
    path('today/', MatchesTodayView.as_view(), name='matches-today'),
    path('<int:matchId>/', MatchInfoView.as_view(), name='match-info')
]
