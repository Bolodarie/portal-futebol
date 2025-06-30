import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 1. Criamos um estado para armazenar os erros
  const [errors, setErrors] = useState({});

  // 2. Função de validação
  const validateForm = () => {
    const newErrors = {};

    // Validação do nome
    if (!name) newErrors.name = 'O nome é obrigatório.';

    // Validação do e-mail
    if (!email) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'O formato do e-mail é inválido.';
    }

    // Validação da senha
    if (!password) {
      newErrors.password = 'A senha é obrigatória.';
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 3. Rodamos a validação antes de qualquer outra coisa
    const formErrors = validateForm();
    
    // Se existem erros (o objeto de erros não está vazio)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Atualiza o estado de erros para exibi-los
    } else {
      // Se não há erros, limpa o estado de erros e prossegue
      setErrors({});
      console.log('Dados do Cadastro (Válidos):', { name, email, password });
      alert('Cadastro realizado com sucesso! (Simulação)');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          {/* 4. Adicionamos a classe 'input-error' se houver erro neste campo */}
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'input-error' : ''}
          />
          {/* 5. Exibimos a mensagem de erro se ela existir */}
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>
        <button type="submit" className="auth-button">Cadastrar</button>
        <p className="switch-form-link">
          Já tem uma conta? <Link to="/login">Entre aqui</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;