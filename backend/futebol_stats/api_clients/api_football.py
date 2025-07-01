from rest_framework.decorators import api_view
import requests
from datetime import datetime
from dotenv import load_dotenv
import os
from pathlib import Path

# Corrigido para alcançar a pasta onde está o .env
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=BASE_DIR / '.env')

API_KEY = os.getenv('SECRET_KEY')
BASE_URL = 'https://v3.football.api-sports.io'
print("🔑 API_KEY carregada:", API_KEY)

if not API_KEY:
    raise ValueError("API_KEY não definida no .env")

HEADERS = {
    'x-apisports-key': API_KEY
}

def get_matches_today():
    date = datetime.now().strftime('%Y-%m-%d')
    url = f'{BASE_URL}/fixtures?date={date}&timezone=America%2FSao_Paulo'
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        return response.json()
    return {"error": "Erro ao buscar partidas"}

def get_team_info(team_id):
    url = f"{BASE_URL}/teams?id={team_id}"
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        return response.json()
    return {"error": "Erro ao buscar informações do time"}

def get_player_info(player_id):
    url = f"{BASE_URL}/players?id={player_id}&season=2023"  # temporada obrigatória
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        return response.json()
    return {"error": "Erro ao buscar informações do jogador"}

def get_match_info(match_id):
    url = f'{BASE_URL}/fixtures/statistics?fixture={match_id}'
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        return response.json()
    return {"error": "Erro ao buscar informações da partida"}

def get_match_lineups(match_id):
    url = f'{BASE_URL}/fixtures/lineups?fixture={match_id}'
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        return response.json()
    return {"error": "Erro ao buscar informações da partida"}