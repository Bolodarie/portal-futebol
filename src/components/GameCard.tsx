import React from 'react';
import './GameCard.css';

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <div className="game-info">
        <span className={`status ${game.status.type}`}>{game.status.text}</span>
        <div className="score">
          <strong>{game.teamA}</strong> {game.scoreA} - {game.scoreB} <strong>{game.teamB}</strong>
        </div>
      </div>
      <ul className="stats">
        {game.stats.map((stat, index) => (
          <li key={index}>{stat}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameCard;