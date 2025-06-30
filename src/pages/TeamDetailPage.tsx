import React from 'react';
// 1. Importe o useNavigate
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockDatabase } from '../mocks/mockDatabase';
import { useAuth } from '../context/AuthContext';
import DetailHeader from '../components/DetailHeader';
import StatCard from '../components/StatCard';
import './DetailPage.css';

const TeamDetailPage = () => {
  const { id } = useParams();
  const team = mockDatabase.times.find(t => t.id === parseInt(id));

  // 2. Inicialize o hook de navegação
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
    } else {
      addFavorite(teamItem);
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

      {/* 3. Troque o <Link> por um <button> que usa navigate(-1) */}
      <button onClick={() => navigate(-1)} className="back-link">
        ← Voltar
      </button>
    </div>
  );
};

export default TeamDetailPage;