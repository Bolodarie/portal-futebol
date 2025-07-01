import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockDatabase } from '../mocks/mockDatabase';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import DetailHeader from '../components/DetailHeader';
import StatCard from '../components/StatCard';
import './DetailPage.css';

const CompetitionDetailPage = () => {
  const { id } = useParams();
  const competition = mockDatabase.competicoes.find(c => c.id === parseInt(id));
  const navigate = useNavigate();

  const { isLoggedIn, favorites, addFavorite, removeFavorite } = useAuth();

  if (!competition) {
    return <div className="main-content"><h2>Competição não encontrada!</h2></div>;
  }

  const isFavorited = favorites.some(fav => fav.id === competition.id && fav.type === 'competition');

  const handleFavoriteClick = () => {
    const competitionItem = { id: competition.id, name: competition.nome, type: 'competition', path: `/competicao/${competition.id}` };
    if (isFavorited) {
      removeFavorite(competitionItem);
       toast.info(`${competition.nome} removido dos favoritos.`);
    } else {
      addFavorite(competitionItem);
       toast.info(`${competition.nome} adicionado aos favoritos.`);
    }
  };

  return (
    <div className="main-content">
      <DetailHeader name={competition.nome}>
        {isLoggedIn && (
          <button onClick={handleFavoriteClick} className="auth-button" style={{width: 'auto'}}>
            {isFavorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          </button>
        )}
      </DetailHeader>

      <div className="stats-grid">
        <StatCard title="País/Região" value={competition.pais} />
        <StatCard title="Nº de Times" value={competition.times} />
        <StatCard title="Atual Campeão" value={competition.atualCampeao} />
      </div>

      <button onClick={() => navigate(-1)} className="back-link">
        ← Voltar
      </button>
    </div>
  );
};

export default CompetitionDetailPage;