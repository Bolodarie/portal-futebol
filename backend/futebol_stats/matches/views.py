from rest_framework.views import APIView
from rest_framework.response import Response
from api_clients.api_football import get_matches_today, get_match_info

class MatchesTodayView(APIView):
    def get(self, request):
        # Descomente a linha abaixo para usar a API real
        # data = get_matches_today()
        
        # Mock data para testes
        data = {
            "get": "fixtures",
            "parameters": {
                "date": "2025-07-01"
            },
            "errors": [],
            "results": 2,
            "paging": {
                "current": 1,
                "total": 1
            },
            "response": [
                {
                    "fixture": {
                        "id": 1338435,
                        "referee": "Oswaldo Contreras, Ecuador",
                        "timezone": "UTC",
                        "date": "2025-07-01T00:00:00+00:00",
                        "timestamp": 1751328000,
                        "periods": {
                            "first": 1751328000,
                            "second": 1751331600
                        },
                        "venue": {
                            "id": 465,
                            "name": "Estadio Banco Guayaquil",
                            "city": "Quito"
                        },
                        "status": {
                            "long": "Match Finished",
                            "short": "FT",
                            "elapsed": 90,
                            "extra": 5
                        }
                    },
                    "league": {
                        "id": 242,
                        "name": "Liga Pro",
                        "country": "Ecuador",
                        "logo": "https://media.api-sports.io/football/leagues/242.png",
                        "flag": "https://media.api-sports.io/flags/ec.svg",
                        "season": 2025,
                        "round": "Regular Season - 18",
                        "standings": True
                    },
                    "teams": {
                        "home": {
                            "id": 21103,
                            "name": "Cuniburo",
                            "logo": "https://media.api-sports.io/football/teams/21103.png",
                            "winner": False
                        },
                        "away": {
                            "id": 1156,
                            "name": "Aucas",
                            "logo": "https://media.api-sports.io/football/teams/1156.png",
                            "winner": True
                        }
                    },
                    "goals": {
                        "home": 0,
                        "away": 1
                    },
                    "score": {
                        "halftime": {
                            "home": 0,
                            "away": 1
                        },
                        "fulltime": {
                            "home": 0,
                            "away": 1
                        },
                        "extratime": {
                            "home": None,
                            "away": None
                        },
                        "penalty": {
                            "home": None,
                            "away": None
                        }
                    }
                },
                {
                    "fixture": {
                        "id": 1353392,
                        "referee": "Lucas Casagrande, Brazil",
                        "timezone": "UTC",
                        "date": "2025-07-01T00:00:00+00:00",
                        "timestamp": 1751328000,
                        "periods": {
                            "first": 1751328000,
                            "second": 1751331600
                        },
                        "venue": {
                            "id": 235,
                            "name": "Arena Pantanal",
                            "city": "Cuiabá, Mato Grosso"
                        },
                        "status": {
                            "long": "Match Finished",
                            "short": "FT",
                            "elapsed": 90,
                            "extra": 7
                        }
                    },
                    "league": {
                        "id": 72,
                        "name": "Serie B",
                        "country": "Brazil",
                        "logo": "https://media.api-sports.io/football/leagues/72.png",
                        "flag": "https://media.api-sports.io/flags/br.svg",
                        "season": 2025,
                        "round": "Regular Season - 14",
                        "standings": True
                    },
                    "teams": {
                        "home": {
                            "id": 1193,
                            "name": "Cuiaba",
                            "logo": "https://media.api-sports.io/football/teams/1193.png",
                            "winner": False
                        },
                        "away": {
                            "id": 2618,
                            "name": "Botafogo SP",
                            "logo": "https://media.api-sports.io/football/teams/2618.png",
                            "winner": True
                        }
                    },
                    "goals": {
                        "home": 0,
                        "away": 1
                    },
                    "score": {
                        "halftime": {
                            "home": 0,
                            "away": 0
                        },
                        "fulltime": {
                            "home": 0,
                            "away": 1
                        },
                        "extratime": {
                            "home": None,
                            "away": None
                        },
                        "penalty": {
                            "home": None,
                            "away": None
                        }
                    }
                }
            ]
        }
        
        return Response(data)
    
class MatchInfoView(APIView):
    def get(self, request, matchId):
        # data = get_match_info(matchId)

        data = {
            "get": "fixtures/statistics",
            "parameters": {
                "fixture": 1338435
            },
            "errors": [],
            "results": 2,
            "paging": {
                "current": 1,
                "total": 1
            },
            "response": [
                {
                    "team": {
                        "id": 21103,
                        "name": "Cuniburo",
                        "logo": "https://media.api-sports.io/football/teams/21103.png"
                    },
                    "statistics": [
                        {
                            "type": "Shots on Goal",
                            "value": 0
                        },
                        {
                            "type": "Shots off Goal",
                            "value": 5
                        },
                        {
                            "type": "Total Shots",
                            "value": 6
                        },
                        {
                            "type": "Blocked Shots",
                            "value": 1
                        },
                        {
                            "type": "Shots insidebox",
                            "value": 4
                        },
                        {
                            "type": "Shots outsidebox",
                            "value": 2
                        },
                        {
                            "type": "Fouls",
                            "value": 5
                        },
                        {
                            "type": "Corner Kicks",
                            "value": 1
                        },
                        {
                            "type": "Offsides",
                            "value": None
                        },
                        {
                            "type": "Ball Possession",
                            "value": "54%"
                        },
                        {
                            "type": "Yellow Cards",
                            "value": 0
                        },
                        {
                            "type": "Red Cards",
                            "value": None
                        },
                        {
                            "type": "Goalkeeper Saves",
                            "value": 1
                        },
                        {
                            "type": "Total passes",
                            "value": 424
                        },
                        {
                            "type": "Passes accurate",
                            "value": 338
                        },
                        {
                            "type": "Passes %",
                            "value": "80%"
                        },
                        {
                            "type": "expected_goals",
                            "value": None
                        },
                        {
                            "type": "goals_prevented",
                            "value": None
                        }
                    ]
                },
                {
                    "team": {
                        "id": 1156,
                        "name": "Aucas",
                        "logo": "https://media.api-sports.io/football/teams/1156.png"
                    },
                    "statistics": [
                        {
                            "type": "Shots on Goal",
                            "value": 2
                        },
                        {
                            "type": "Shots off Goal",
                            "value": 5
                        },
                        {
                            "type": "Total Shots",
                            "value": 8
                        },
                        {
                            "type": "Blocked Shots",
                            "value": 1
                        },
                        {
                            "type": "Shots insidebox",
                            "value": 5
                        },
                        {
                            "type": "Shots outsidebox",
                            "value": 3
                        },
                        {
                            "type": "Fouls",
                            "value": 11
                        },
                        {
                            "type": "Corner Kicks",
                            "value": 3
                        },
                        {
                            "type": "Offsides",
                            "value": None
                        },
                        {
                            "type": "Ball Possession",
                            "value": "46%"
                        },
                        {
                            "type": "Yellow Cards",
                            "value": 3
                        },
                        {
                            "type": "Red Cards",
                            "value": None
                        },
                        {
                            "type": "Goalkeeper Saves",
                            "value": 0
                        },
                        {
                            "type": "Total passes",
                            "value": 358
                        },
                        {
                            "type": "Passes accurate",
                            "value": 284
                        },
                        {
                            "type": "Passes %",
                            "value": "79%"
                        },
                        {
                            "type": "expected_goals",
                            "value": None
                        },
                        {
                            "type": "goals_prevented",
                            "value": None
                        }
                    ]
                }
            ]
        }

        return Response(data)
