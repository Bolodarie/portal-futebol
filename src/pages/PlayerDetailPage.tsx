import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockDatabase } from '../mocks/mockDatabase';
import { useAuth } from '../context/AuthContext';
import DetailHeader from '../components/DetailHeader';
import StatCard from '../components/StatCard';
import './DetailPage.css';

const PlayerDetailPage = () => {
  const { id } = useParams();
  const player = mockDatabase.jogadores.find(j => j.id === parseInt(id));
  
  // 2. Inicialize o hook de navegação
  const navigate = useNavigate();
  
  const { isLoggedIn, favorites, addFavorite, removeFavorite } = useAuth();
  
  if (!player) {
    return <div className="main-content"><h2>Jogador não encontrado!</h2></div>;
  }

  const isFavorited = favorites.some(fav => fav.id === player.id && fav.type === 'player');

  const handleFavoriteClick = () => {
    const playerItem = { id: player.id, name: player.nome, type: 'player', path: `/jogador/${player.id}` };
    if (isFavorited) {
      removeFavorite(playerItem);
    } else {
      addFavorite(playerItem);
    }
  };

  return (
    <div className="main-content">
      <DetailHeader name={player.nome}>
        {isLoggedIn && (
          <button onClick={handleFavoriteClick} className="auth-button" style={{width: 'auto'}}>
            {isFavorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          </button>
        )}
      </DetailHeader>

      <div className="stats-grid">
        <StatCard title="Time" value={player.time} />
        <StatCard title="Posição" value={player.posicao} />
        <StatCard title="Gols na Carreira" value={player.gols} />
        <StatCard title="Assistências" value={player.assistencias} />
      </div>
      <button onClick={() => navigate(-1)} className="back-link">
        ← Voltar
      </button>
    </div>
  );
};

export default PlayerDetailPage;