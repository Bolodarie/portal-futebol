import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './AuthForm.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'O formato do e-mail é inválido.';
    }
    
    if (!password) {
      newErrors.password = 'A senha é obrigatória.';
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres.';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast.success('Login realizado com sucesso!');
        navigate('/');
      } else {
        // Tratar diferentes tipos de erro
        if (result.error.includes('credentials') || result.error.includes('Invalid')) {
          setErrors({ 
            general: 'Email ou senha incorretos.' 
          });
        } else {
          setErrors({ 
            general: result.error || 'Erro ao fazer login. Tente novamente.' 
          });
        }
        toast.error(result.error || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ 
        general: 'Erro de conexão. Verifique sua internet e tente novamente.' 
      });
      toast.error('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Entrar no Portal</h2>
        
        {errors.general && (
          <div className="error-banner">
            <p>{errors.general}</p>
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'input-error' : ''}
            disabled={loading}
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
            disabled={loading}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>
        
        <button 
          type="submit" 
          className="auth-button" 
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        
        <p className="switch-form-link">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;