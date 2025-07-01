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
  
  const { isLoggedIn, favorites, addFavorite, removeFavorite } = useAuth();

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
        // Verificamos se 'response' é um array e se contém pelo menos um elemento
        if (data.response && Array.isArray(data.response) && data.response.length > 0) {
          // O primeiro objeto no array 'response' contém os dados do jogador
          setPlayer(data.response[0].player);
        } else {
          // Se o formato dos dados for inesperado ou não houver dados
          setError('Dados do jogador não encontrados ou formato inesperado.');
          console.error('Formato de dados inesperado:', data);
        }
      } catch (err) {
        // Captura e define qualquer erro que ocorra durante a requisição
        console.error('Erro na requisição:', err);
        setError('Falha ao carregar dados do jogador. Verifique a conexão ou o ID do jogador.');
      } finally {
        // Define loading como false, independentemente do sucesso ou falha
        setLoading(false);
      }
    };

    // Chama a função fetchPlayerData quando o componente é montado ou id muda
    fetchPlayerData();
  }, [id]); // O useEffect será re-executado se o id mudar

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

  // Verifica se o jogador está nos favoritos
  const isFavorited = favorites.some(fav => fav.id === player.id && fav.type === 'player');
  
  const handleFavoriteClick = () => {
    const playerItem = { 
      id: player.id, 
      name: player.name, 
      type: 'player', 
      path: `/player/${player.id}` 
    };
    
    if (isFavorited) {
      removeFavorite(playerItem);
      toast.info(`${player.name} removido dos favoritos.`);
    } else {
      addFavorite(playerItem);
      toast.info(`${player.name} adicionado aos favoritos.`);
    }
  };

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
          >
            {isFavorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
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

      <style jsx>{`
        .player-header-info {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .player-photo {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #007bff;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .player-basic-info h1 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 2rem;
        }

        .player-full-name {
          color: #666;
          font-size: 1.1rem;
          margin: 0 0 5px 0;
          font-style: italic;
        }

        .player-number {
          color: #007bff;
          font-weight: bold;
          font-size: 1.1rem;
          margin: 0;
        }

        .loading-container, 
        .error-container, 
        .no-data-container {
          text-align: center;
          padding: 40px 20px;
        }

        .loading-text {
          color: #007bff;
          font-size: 1.2rem;
        }

        .error-container h2 {
          color: #dc3545;
          margin-bottom: 15px;
        }

        .error-text {
          color: #666;
          margin-bottom: 20px;
          font-size: 1.1rem;
        }

        .no-data-container h2 {
          color: #6c757d;
          margin-bottom: 15px;
        }

        .no-data-container p {
          color: #666;
          margin-bottom: 20px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        @media (max-width: 768px) {
          .player-header-info {
            flex-direction: column;
            text-align: center;
          }

          .player-photo {
            width: 100px;
            height: 100px;
          }

          .player-basic-info h1 {
            font-size: 1.5rem;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default PlayerDetailPage;