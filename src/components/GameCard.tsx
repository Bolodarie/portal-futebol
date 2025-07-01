import React from 'react';
import './GameCard.css';

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <div className="game-info">
        <span className={`status finished`}>{game.fixture.status.long}</span>
        <div className="score">
          <div>
            <img src={game.teams.home.logo} alt="Time mandante" className='team-logo' />
            <strong>{game.teams.home.name}</strong>
            <label className="goal-score">{game.goals.home}</label>
          </div>
          <div>
            <img src={game.teams.away.logo} alt="Time visitante" className='team-logo' />
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