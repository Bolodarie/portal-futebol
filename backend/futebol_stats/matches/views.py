from rest_framework.views import APIView
from rest_framework.response import Response
from api_clients.api_football import get_matches_today, get_match_info, get_match_lineups
from rest_framework.permissions import AllowAny, IsAuthenticated


class MatchesTodayView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Descomente a linha abaixo para usar a API real
        data = get_matches_today()
        
        return Response(data)
    
class MatchInfoView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, matchId):
        data = get_match_info(matchId)

        return Response(data)
    
class MatchLineupsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, matchId):
        data = get_match_lineups(matchId)

        return Response(data)