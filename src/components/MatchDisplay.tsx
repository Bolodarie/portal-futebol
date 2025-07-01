import React from 'react';
import './MatchDisplay.css';

const MatchDisplay = ({
  homeTeam,
  awayTeam
}) => {
  return (
    <>
      {/* O contêiner principal ocupa toda a largura disponível */}
      <div className="match-container">
        {/* Contêiner para a exibição do conteúdo da partida */}
        <div className="match-content">
          {/* Seção do Time da Casa */}
          <div className="team-section home-team">
            {/* Nome do time da casa */}
            <span className="team-name">{homeTeam.name}</span>
            {/* Logo do time da casa */}
            {homeTeam.logo && (
              <img
                src={homeTeam.logo}
                alt={`${homeTeam.name} Logo`}
                className="team-logo"
                // Fallback para imagem placeholder em caso de erro no carregamento
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/40x40/cccccc/ffffff?text=Logo`;
                }}
              />
            )}
          </div>

          <div className='score-separator'>X</div>

          {/* Seção do Time Visitante */}
          <div className="team-section away-team">
            {/* Logo do time visitante */}
            {awayTeam && (
              <img
                src={awayTeam.logo}
                alt={`${awayTeam.name} Logo`}
                className="team-logo"
                // Fallback para imagem placeholder em caso de erro no carregamento
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/40x40/cccccc/ffffff?text=Logo`;
                }}
              />
            )}
            {/* Nome do time visitante */}
            <span className="team-name">{awayTeam.name}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchDisplay;
