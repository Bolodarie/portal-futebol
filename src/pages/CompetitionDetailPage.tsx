import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockDatabase } from '../mocks/mockDatabase';
import { useAuth } from '../context/AuthContext'; // Importando o contexto

const CompetitionDetailPage = () => {
  const { id } = useParams();
  const competition = mockDatabase.competicoes.find(c => c.id === parseInt(id));

  // Pega o estado e as funções do contexto
  const { isLoggedIn, favorites, addFavorite, removeFavorite } = useAuth();

  // Verifica se esta competição já está nos favoritos
  const isFavorited = favorites.some(fav => fav.id === competition.id && fav.type === 'competition');

  const handleFavoriteClick = () => {
    // Cria o objeto 'item' com o formato que o nosso contexto espera
    const competitionItem = { id: competition.id, name: competition.nome, type: 'competition', path: `/competicao/${competition.id}` };
    
    if (isFavorited) {
      removeFavorite(competitionItem);
    } else {
      addFavorite(competitionItem);
    }
  };

  if (!competition) {
    return <div className="main-content"><h2>Competição não encontrada!</h2></div>;
  }

  return (
    <div className="main-content">
      <h1>{competition.nome}</h1>
      
      {/* Mostra o botão apenas se o usuário estiver logado */}
      {isLoggedIn && (
        <button onClick={handleFavoriteClick} className="auth-button" style={{marginBottom: '20px', width: 'auto'}}>
          {isFavorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </button>
      )}

      <ul>
        <li><strong>País/Região:</strong> {competition.pais}</li>
        <li><strong>Nº de Times:</strong> {competition.times}</li>
        <li><strong>Atual Campeão:</strong> {competition.atualCampeao}</li>
      </ul>
      <Link to="/">Voltar para a home</Link>
    </div>
  );
};

export default CompetitionDetailPage;