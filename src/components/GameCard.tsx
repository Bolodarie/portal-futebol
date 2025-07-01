import React from 'react';
import './GameCard.css';
import { useNavigate } from 'react-router-dom';

const GameCard = ({ game }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/match/${game.fixture.id}`);
  };

  return (
    <div className="game-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="game-info">
        <span className={`status finished`}>{game.fixture.status.long}</span>
        <div className="score">
          <div className='team-home'>
            <img src={game.teams.home.logo} alt="Time mandante" className='logo' />
            <strong>{game.teams.home.name}</strong>
            <label className="goal-score">{game.goals.home}</label>
          </div>
          <div className='team-away'>
            <img src={game.teams.away.logo} alt="Time visitante" className='logo' />
            <strong>{game.teams.away.name}</strong>
            <label className="goal-score">{game.goals.away}</label>
          </div>
        </div>
        <div className="">
          <p>{game.league.name} - {game.league.country}</p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;