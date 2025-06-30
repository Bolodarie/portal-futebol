import React from 'react';
import './DetailHeader.css';

// Recebe o nome da entidade e 'children' para o botão de favoritar
const DetailHeader = ({ name, children }) => {
  return (
    <div className="detail-header">
      <h1 className="detail-name">{name}</h1>
      <div className="detail-actions">
        {children}
      </div>
    </div>
  );
};

export default DetailHeader;