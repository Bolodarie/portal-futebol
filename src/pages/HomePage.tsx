import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import './HomePage.css';

const HomePage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/matches/today/')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // A resposta da API tem a estrutura { response: [...] }
        if (data.response && Array.isArray(data.response)) {
          setGames(data.response);
        } else {
          console.error('Formato de dados inesperado:', data);
        }
      })
      .catch(err => console.error('Erro na requisição:', err));
  }, []);

  return (
    <div className="main-content">
      <h2>Jogos do Dia</h2>
      <p>Acompanhe as principais partidas de hoje.</p>
      <div className="games-container">
        {games.map(game => (
          <GameCard key={game.fixture.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;