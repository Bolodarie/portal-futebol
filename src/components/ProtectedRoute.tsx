import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Este componente recebe um 'children', que é a página que queremos proteger.
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // Se o usuário não estiver logado, usamos o componente Navigate para redirecioná-lo.
  if (!isLoggedIn) {
    // O 'replace' evita que a página protegida entre no histórico de navegação,
    // então o usuário não volta para ela ao clicar no botão "voltar" do navegador.
    return <Navigate to="/login" replace />;
  }

  // Se o usuário estiver logado, simplesmente renderizamos a página filha.
  return children;
};

export default ProtectedRoute;