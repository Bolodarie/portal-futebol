import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Página Não Encontrada</h2>
      <p className="error-description">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <Link to="/" className="back-home-btn">
        Voltar para a Página Inicial
      </Link>
    </div>
  );
};

export default NotFoundPage;