import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SearchResultsPage.css'; // Reutilizando o CSS que já temos

const FavoritesPage = () => {
  const { favorites } = useAuth();

  return (
    <div className="main-content">
      <h2>Meus Favoritos</h2>
      
      {favorites.length === 0 ? (
        <p>Você ainda não adicionou nenhum favorito. Navegue pelo site e clique em "Adicionar aos Favoritos" para começar!</p>
      ) : (
        <div className="results-grid">
          <div className="results-category">
            {favorites.map(item => (
              <Link to={item.path} key={`${item.type}-${item.id}`} className="result-item">
                {item.name} <span style={{textTransform: 'capitalize', color: '#888', fontSize: '12px'}}>({item.type})</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;