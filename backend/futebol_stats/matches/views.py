from rest_framework.views import APIView
from rest_framework.response import Response
from api_clients.api_football import get_matches_today, get_match_info, get_match_lineups
from rest_framework.permissions import AllowAny, IsAuthenticated


class MatchesTodayView(APIView):
    permission_classes = [AllowAny]

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
    permission_classes = [AllowAny]

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
    
class MatchLineupsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, matchId):
        # data = get_match_lineups(matchId)

        data = {
            "get": "fixtures/lineups",
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
                        "logo": "https://media.api-sports.io/football/teams/21103.png",
                        "colors": {
                            "player": {
                                "primary": "db6571",
                                "number": "ffffff",
                                "border": "db6571"
                            },
                            "goalkeeper": {
                                "primary": "abd6e8",
                                "number": "ffffff",
                                "border": "abd6e8"
                            }
                        }
                    },
                    "formation": "5-3-2",
                    "startXI": [
                        {
                            "player": {
                                "id": 59102,
                                "name": "Lisandro Mitre",
                                "number": 25,
                                "pos": "G",
                                "grid": "1:1"
                            }
                        },
                        {
                            "player": {
                                "id": 198496,
                                "name": "Luis Gomez",
                                "number": 23,
                                "pos": "D",
                                "grid": "2:5"
                            }
                        },
                        {
                            "player": {
                                "id": 296747,
                                "name": "Iago Iriarte",
                                "number": 2,
                                "pos": "D",
                                "grid": "2:4"
                            }
                        },
                        {
                            "player": {
                                "id": 289428,
                                "name": "Gian Nardelli",
                                "number": 36,
                                "pos": "D",
                                "grid": "2:3"
                            }
                        },
                        {
                            "player": {
                                "id": 5780,
                                "name": "Alan Aguirre",
                                "number": 4,
                                "pos": "D",
                                "grid": "2:2"
                            }
                        },
                        {
                            "player": {
                                "id": 16262,
                                "name": "Kevin Ushina",
                                "number": 18,
                                "pos": "D",
                                "grid": "2:1"
                            }
                        },
                        {
                            "player": {
                                "id": 16718,
                                "name": "Madison Julio",
                                "number": 52,
                                "pos": "M",
                                "grid": "3:3"
                            }
                        },
                        {
                            "player": {
                                "id": 52931,
                                "name": "Christian Larotonda",
                                "number": 15,
                                "pos": "M",
                                "grid": "3:2"
                            }
                        },
                        {
                            "player": {
                                "id": 16447,
                                "name": "Francisco Mera",
                                "number": 40,
                                "pos": "M",
                                "grid": "3:1"
                            }
                        },
                        {
                            "player": {
                                "id": 64175,
                                "name": "Rafael Monti",
                                "number": 17,
                                "pos": "F",
                                "grid": "4:2"
                            }
                        },
                        {
                            "player": {
                                "id": 81181,
                                "name": "Danny Luna",
                                "number": 10,
                                "pos": "F",
                                "grid": "4:1"
                            }
                        }
                    ],
                    "substitutes": [
                        {
                            "player": {
                                "id": 321651,
                                "name": "Ariel Mina",
                                "number": 11,
                                "pos": "F",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 355514,
                                "name": "Edison Hernandez",
                                "number": 26,
                                "pos": "D",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 368154,
                                "name": "Alexis Melo",
                                "number": 19,
                                "pos": "M",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 508223,
                                "name": "Kevin Coba",
                                "number": 5,
                                "pos": "D",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 159340,
                                "name": "José Lugo",
                                "number": 7,
                                "pos": "F",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 16351,
                                "name": "Joan López",
                                "number": 1,
                                "pos": "G",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 16679,
                                "name": "Marco Alexander Carrasco Bonilla",
                                "number": 13,
                                "pos": "M",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 371013,
                                "name": "Nicolas Molina",
                                "number": 9,
                                "pos": "F",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 460430,
                                "name": "Wilmer Conforme",
                                "number": 53,
                                "pos": "M",
                                "grid": None
                            }
                        }
                    ],
                    "coach": {
                        "id": 24515,
                        "name": "Juan Fernando Grabowski",
                        "photo": "https://media.api-sports.io/football/coachs/24515.png"
                    }
                },
                {
                    "team": {
                        "id": 1156,
                        "name": "Aucas",
                        "logo": "https://media.api-sports.io/football/teams/1156.png",
                        "colors": {
                            "player": {
                                "primary": "fdd92b",
                                "number": "050505",
                                "border": "fdd92b"
                            },
                            "goalkeeper": {
                                "primary": "4c09aa",
                                "number": "f7f7f7",
                                "border": "4c09aa"
                            }
                        }
                    },
                    "formation": "4-4-2",
                    "startXI": [
                        {
                            "player": {
                                "id": 16352,
                                "name": "Hamilton Piedra",
                                "number": 32,
                                "pos": "G",
                                "grid": "1:1"
                            }
                        },
                        {
                            "player": {
                                "id": 311329,
                                "name": "Ulises Albano Ciccioli",
                                "number": 27,
                                "pos": "D",
                                "grid": "2:4"
                            }
                        },
                        {
                            "player": {
                                "id": 119811,
                                "name": "Jhon Ontaneda",
                                "number": 3,
                                "pos": "D",
                                "grid": "2:3"
                            }
                        },
                        {
                            "player": {
                                "id": 126675,
                                "name": "Estalin Segura",
                                "number": 2,
                                "pos": "D",
                                "grid": "2:2"
                            }
                        },
                        {
                            "player": {
                                "id": 198491,
                                "name": "Jonnathan Mina",
                                "number": 15,
                                "pos": "D",
                                "grid": "2:1"
                            }
                        },
                        {
                            "player": {
                                "id": 16229,
                                "name": "Luis Cano",
                                "number": 22,
                                "pos": "M",
                                "grid": "3:4"
                            }
                        },
                        {
                            "player": {
                                "id": 289496,
                                "name": "Agostino Spina",
                                "number": 21,
                                "pos": "M",
                                "grid": "3:3"
                            }
                        },
                        {
                            "player": {
                                "id": 16363,
                                "name": "Renny Jaramillo",
                                "number": 25,
                                "pos": "M",
                                "grid": "3:2"
                            }
                        },
                        {
                            "player": {
                                "id": 374138,
                                "name": "Ariel Almagro",
                                "number": 18,
                                "pos": "M",
                                "grid": "3:1"
                            }
                        },
                        {
                            "player": {
                                "id": 70772,
                                "name": "Brian Montenegro",
                                "number": 9,
                                "pos": "F",
                                "grid": "4:2"
                            }
                        },
                        {
                            "player": {
                                "id": 119812,
                                "name": "Angelo Mina",
                                "number": 8,
                                "pos": "F",
                                "grid": "4:1"
                            }
                        }
                    ],
                    "substitutes": [
                        {
                            "player": {
                                "id": 371627,
                                "name": "Mario Sanabria",
                                "number": 79,
                                "pos": "M",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 16520,
                                "name": "Daniel Patino",
                                "number": 4,
                                "pos": "D",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 428791,
                                "name": "Óscar Pepinos",
                                "number": 19,
                                "pos": "M",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 311535,
                                "name": "Cristopher Zambrano",
                                "number": 17,
                                "pos": "F",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 35537,
                                "name": "Edson Resendez",
                                "number": 24,
                                "pos": "G",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 476654,
                                "name": "Robino Quinónez",
                                "number": 28,
                                "pos": "M",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": None,
                                "name": "Adonys Quiñonez",
                                "number": 41,
                                "pos": "M",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": None,
                                "name": "Dario Torres",
                                "number": 38,
                                "pos": "M",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 475123,
                                "name": "Sleider Mancilla",
                                "number": 6,
                                "pos": "D",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 512514,
                                "name": "Edison Gruezo",
                                "number": 44,
                                "pos": "M",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": 502519,
                                "name": "Nicolás Sotomayor",
                                "number": 36,
                                "pos": "M",
                                "grid": None
                            }
                        },
                        {
                            "player": {
                                "id": None,
                                "name": "Rafael Bautista",
                                "number": 34,
                                "pos": "M",
                                "grid": None
                            }
                        }
                    ],
                    "coach": {
                        "id": 997,
                        "name": "Gabriel Ernesto Pereyra Vázquez",
                        "photo": "https://media.api-sports.io/football/coachs/997.png"
                    }
                }
            ]
        }

        return Response(data)