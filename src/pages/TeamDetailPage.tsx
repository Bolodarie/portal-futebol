import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockDatabase } from '../mocks/mockDatabase';
import { useAuth } from '../context/AuthContext'; // Importando o contexto

const TeamDetailPage = () => {
  const { id } = useParams();
  const team = mockDatabase.times.find(t => t.id === parseInt(id));

  // Pega o estado e as funções do contexto
  const { isLoggedIn, favorites, addFavorite, removeFavorite } = useAuth();

  // Verifica se este time já está nos favoritos
  const isFavorited = favorites.some(fav => fav.id === team.id && fav.type === 'team');

  const handleFavoriteClick = () => {
    // Cria o objeto 'item' com o formato que o nosso contexto espera
    const teamItem = { id: team.id, name: team.nome, type: 'team', path: `/time/${team.id}` };
    
    if (isFavorited) {
      removeFavorite(teamItem);
    } else {
      addFavorite(teamItem);
    }
  };

  if (!team) {
    return <div className="main-content"><h2>Time não encontrado!</h2></div>;
  }

  return (
    <div className="main-content">
      <h1>{team.nome}</h1>

      {/* Mostra o botão apenas se o usuário estiver logado */}
      {isLoggedIn && (
        <button onClick={handleFavoriteClick} className="auth-button" style={{marginBottom: '20px', width: 'auto'}}>
          {isFavorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </button>
      )}
      
      <ul>
        <li><strong>Técnico:</strong> {team.tecnico}</li>
        <li><strong>Estádio:</strong> {team.estadio}</li>
        <li><strong>Títulos (Brasileirão):</strong> {team.titulos}</li>
      </ul>
      <Link to="/">Voltar para a home</Link>
    </div>
  );
};

export default TeamDetailPage;