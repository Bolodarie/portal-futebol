import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockDatabase } from '../mocks/mockDatabase';
import { useAuth } from '../context/AuthContext'; // Importe o contexto

const PlayerDetailPage = () => {
  const { id } = useParams();
  const player = mockDatabase.jogadores.find(j => j.id === parseInt(id));
  
  // Pega o estado e as funções do contexto
  const { isLoggedIn, favorites, addFavorite, removeFavorite } = useAuth();
  
  // Verifica se este jogador já está nos favoritos
  const isFavorited = favorites.some(fav => fav.id === player.id && fav.type === 'player');

  const handleFavoriteClick = () => {
    const playerItem = { id: player.id, name: player.nome, type: 'player', path: `/jogador/${player.id}` };
    if (isFavorited) {
      removeFavorite(playerItem);
    } else {
      addFavorite(playerItem);
    }
  };

  if (!player) {
    return <div className="main-content"><h2>Jogador não encontrado!</h2></div>;
  }

  return (
    <div className="main-content">
      <h1>{player.nome}</h1>
      {/* Mostra o botão apenas se o usuário estiver logado */}
      {isLoggedIn && (
        <button onClick={handleFavoriteClick} className="auth-button" style={{marginBottom: '20px', width: 'auto'}}>
          {isFavorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </button>
      )}
      <ul>
        <li><strong>Time:</strong> {player.time}</li>
        {/* ... outras estatísticas */}
      </ul>
      <Link to="/">Voltar para a home</Link>
    </div>
  );
};

export default PlayerDetailPage;