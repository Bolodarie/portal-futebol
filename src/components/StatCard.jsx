import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value }) => {
  return (
    <div className="stat-card">
      <h4 className="stat-title">{title}</h4>
      <p className="stat-value">{value}</p>
    </div>
  );
};

export default StatCard;