from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api_clients.api_football import get_team_info
from rest_framework.permissions import AllowAny

class TeamDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, team_id):
        # data = get_team_info(team_id)
        data = {
            "get": "teams",
            "parameters": {
                "id": "21103"
            },
            "errors": [],
            "results": 1,
            "paging": {
                "current": 1,
                "total": 1
            },
            "response": [
                {
                    "team": {
                        "id": 21103,
                        "name": "Cuniburo",
                        "code": None,
                        "country": "Ecuador",
                        "founded": None,
                        "national": False,
                        "logo": "https://media.api-sports.io/football/teams/21103.png"
                    },
                    "venue": {
                        "id": None,
                        "name": None,
                        "address": None,
                        "city": None,
                        "capacity": None,
                        "surface": None,
                        "image": None
                    }
                }
            ]
        }

        if "error" in data:
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        return Response(data)