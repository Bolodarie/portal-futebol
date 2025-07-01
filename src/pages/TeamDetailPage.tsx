import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockDatabase } from '../mocks/mockDatabase';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import DetailHeader from '../components/DetailHeader';
import StatCard from '../components/StatCard';
import './DetailPage.css';

const TeamDetailPage = () => {
  const { id } = useParams();
  const team = mockDatabase.times.find(t => t.id === parseInt(id));

  const navigate = useNavigate();
  
  const { isLoggedIn, favorites, addFavorite, removeFavorite } = useAuth();

  if (!team) {
    return <div className="main-content"><h2>Time não encontrado!</h2></div>;
  }

  const isFavorited = favorites.some(fav => fav.id === team.id && fav.type === 'team');

  const handleFavoriteClick = () => {
    const teamItem = { id: team.id, name: team.nome, type: 'team', path: `/time/${team.id}` };
    if (isFavorited) {
      removeFavorite(teamItem);
       toast.info(`${team.nome} removido dos favoritos.`);
    } else {
      addFavorite(teamItem);
       toast.info(`${team.nome} adicionado aos favoritos.`);
    }
  };

  return (
    <div className="main-content">
      <DetailHeader name={team.nome}>
        {isLoggedIn && (
          <button onClick={handleFavoriteClick} className="auth-button" style={{width: 'auto'}}>
            {isFavorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          </button>
        )}
      </DetailHeader>

      <div className="stats-grid">
        <StatCard title="Técnico" value={team.tecnico} />
        <StatCard title="Estádio" value={team.estadio} />
        <StatCard title="Títulos (Brasileirão)" value={team.titulos} />
      </div>

      <button onClick={() => navigate(-1)} className="back-link">
        ← Voltar
      </button>
    </div>
  );
};

export default TeamDetailPage;