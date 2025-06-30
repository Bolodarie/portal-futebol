import React from 'react';
import GameCard from '../components/GameCard';
import './HomePage.css';

const mockGames = [
  {
    id: 1,
    teamA: 'Palmeiras', scoreA: '2',
    teamB: 'Corinthians', scoreB: '1',
    status: { type: 'live', text: 'AO VIVO' },
    stats: ['Chutes: 10', 'Posse de bola: 55%']
  },
  {
    id: 2,
    teamA: 'São Paulo', scoreA: '0',
    teamB: 'Santos', scoreB: '3',
    status: { type: 'finished', text: 'ENCERRADO' },
    stats: ['Cartões amarelos: 3', 'Faltas cometidas: 12']
  },
  {
    id: 3,
    teamA: 'Flamengo', scoreA: '',
    teamB: 'Vasco', scoreB: '',
    status: { type: 'scheduled', text: '21:30' },
    stats: ['Competição: Brasileirão', 'Estádio: Maracanã']
  },
   {
    id: 4,
    teamA: 'Grêmio', scoreA: '1',
    teamB: 'Internacional', scoreB: '1',
    status: { type: 'finished', text: 'ENCERRADO' },
    stats: ['Escanteios: 8', 'Impedimentos: 2']
  },
];

const HomePage = () => {
  return (
    <div className="main-content">
      <h2>Jogos do Dia</h2>
      <p>Acompanhe as principais partidas de hoje.</p>

      <div className="games-container">
        {mockGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;