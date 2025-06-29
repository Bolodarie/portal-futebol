import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importando o hook do nosso contexto
import './AuthForm.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useAuth(); // Pega a função de login do contexto
  const navigate = useNavigate(); // Hook para navegar entre as páginas

  const handleSubmit = (e) => {
    e.preventDefault();
    // No futuro, aqui você faria uma chamada para o backend para validar o usuário.
    // Por enquanto, estamos apenas simulando.
    console.log('Tentativa de login com:', { email, password });
    
    // Simula o sucesso do login
    login(); // Chama a função do contexto para atualizar o estado global para 'logado'
    alert('Login realizado com sucesso!');
    navigate('/'); // Leva o usuário para a home (que agora mostrará os favoritos)
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Entrar no Portal</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">Entrar</button>
        <p className="switch-form-link">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;