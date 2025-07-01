import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import DetailHeader from '../components/DetailHeader';
import StatCard from '../components/StatCard';
import './DetailPage.css';

const PlayerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estados para armazenar os dados do jogador
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  
  const { isLoggedIn, getToken } = useAuth(); // Assumindo que você tem o token no contexto
  const token = getToken();

  // Função para fazer requisições autenticadas
  const apiRequest = async (url, options = {}) => {
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    console.log(token)
    if (token) {
      defaultHeaders['Authorization'] = `Token ${token}`;
    }

    return fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });
  };

  // Função para verificar se o jogador está nos favoritos
  const checkFavoriteStatus = async () => {
    if (!isLoggedIn || !player) return;

    try {
      const response = await apiRequest(`http://localhost:8000/api/favoritos/verificar/${id}/`);
      if (response.ok) {
        const data = await response.json();
        setIsFavorited(data.is_favorite);
      }
    } catch (error) {
      console.error('Erro ao verificar status de favorito:', error);
    }
  };

  // Função para adicionar aos favoritos
  const addToFavorites = async () => {
    if (!player) return;

    setFavoritesLoading(true);
    try {
      const response = await apiRequest('http://127.0.0.1:8000/api/favoritos/adicionar/', {
        method: 'POST',
        body: JSON.stringify({
          IdJogador: parseInt(id),
          Nome: player.name,
          Nacionalidade: player.nationality || '',
          Posicao: player.position || ''
        }),
      });

      if (response.ok) {
        setIsFavorited(true);
        toast.success(`${player.name} adicionado aos favoritos!`);
      } else {
        const errorData = await response.json();
        if (errorData.error === 'Jogador já está nos favoritos') {
          setIsFavorited(true);
          toast.info('Este jogador já está nos seus favoritos.');
        } else {
          toast.error('Erro ao adicionar aos favoritos.');
        }
      }
    } catch (error) {
      console.error('Erro ao adicionar aos favoritos:', error);
      toast.error('Erro de conexão ao adicionar aos favoritos.');
    } finally {
      setFavoritesLoading(false);
    }
  };

  // Função para remover dos favoritos
  const removeFromFavorites = async () => {
    setFavoritesLoading(true);
    try {
      const response = await apiRequest(`http://127.0.0.1:8000/api/favoritos/remover/${id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setIsFavorited(false);
        toast.success(`${player.name} removido dos favoritos!`);
      } else {
        toast.error('Erro ao remover dos favoritos.');
      }
    } catch (error) {
      console.error('Erro ao remover dos favoritos:', error);
      toast.error('Erro de conexão ao remover dos favoritos.');
    } finally {
      setFavoritesLoading(false);
    }
  };

  // Função para lidar com o clique no botão de favoritos
  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  };

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        // Faz a requisição para a API de detalhes do jogador
        const res = await fetch(`http://127.0.0.1:8000/api/players/${id}/`);
        
        // Verifica se a resposta da rede foi bem-sucedida
        if (!res.ok) {
          throw new Error(`Erro HTTP! Status: ${res.status}`);
        }

        // Converte a resposta para JSON
        const data = await res.json();
        console.log(data)

        // A resposta da API tem a estrutura { response: [...] }
        if (data.response && Array.isArray(data.response) && data.response.length > 0) {
          setPlayer(data.response[0].player);
        } else {
          setError('Dados do jogador não encontrados ou formato inesperado.');
          console.error('Formato de dados inesperado:', data);
        }
      } catch (err) {
        console.error('Erro na requisição:', err);
        setError('Falha ao carregar dados do jogador. Verifique a conexão ou o ID do jogador.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [id]);

  // Verifica o status de favorito quando o jogador é carregado
  useEffect(() => {
    if (player && isLoggedIn) {
      checkFavoriteStatus();
    }
  }, [player, isLoggedIn]);

  // Função para calcular a idade baseada na data de nascimento
  const calculateAge = (birthDate) => {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Função para formatar a data de nascimento
  const formatBirthDate = (birthDate) => {
    if (!birthDate) return 'N/A';
    const date = new Date(birthDate);
    return date.toLocaleDateString('pt-BR');
  };

  // Renderização condicional para estados de carregamento
  if (loading) {
    return (
      <div className="main-content">
        <div className="loading-container">
          <p className="loading-text">Carregando dados do jogador...</p>
        </div>
      </div>
    );
  }

  // Renderização condicional para estados de erro
  if (error) {
    return (
      <div className="main-content">
        <div className="error-container">
          <h2>Erro ao carregar jogador</h2>
          <p className="error-text">{error}</p>
          <button onClick={() => navigate(-1)} className="back-link">
            ← Voltar
          </button>
        </div>
      </div>
    );
  }

  // Se não há dados do jogador após o carregamento
  if (!player) {
    return (
      <div className="main-content">
        <div className="no-data-container">
          <h2>Jogador não encontrado!</h2>
          <p>Os dados do jogador não estão disponíveis.</p>
          <button onClick={() => navigate(-1)} className="back-link">
            ← Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <DetailHeader name={player.name}>
        <div className="player-header-info">
          {player.photo && (
            <img 
              src={player.photo} 
              alt={`${player.name} photo`}
              className="player-photo"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          <div className="player-basic-info">
            <h1>{player.name}</h1>
            <p className="player-full-name">
              {player.firstname} {player.lastname}
            </p>
            {player.number && (
              <p className="player-number">Camisa #{player.number}</p>
            )}
          </div>
        </div>
        {isLoggedIn && (
          <button 
            onClick={handleFavoriteClick} 
            className="auth-button" 
            style={{width: 'auto'}}
            disabled={favoritesLoading}
          >
            {favoritesLoading 
              ? 'Carregando...' 
              : (isFavorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos')
            }
          </button>
        )}
      </DetailHeader>

      <div className="stats-grid">
        <StatCard title="Posição" value={player.position || 'N/A'} />
        <StatCard title="Nacionalidade" value={player.nationality || 'N/A'} />
        <StatCard title="Idade" value={`${calculateAge(player.birth?.date)} anos`} />
        <StatCard title="Data de Nascimento" value={formatBirthDate(player.birth?.date)} />
        <StatCard title="Local de Nascimento" value={player.birth?.place || 'N/A'} />
        <StatCard title="País de Nascimento" value={player.birth?.country || 'N/A'} />
        <StatCard title="Altura" value={player.height || 'N/A'} />
        <StatCard title="Peso" value={player.weight || 'N/A'} />
      </div>

      <button onClick={() => navigate(-1)} className="back-link">
        ← Voltar
      </button>
    </div>
  );
};

export default PlayerDetailPage;