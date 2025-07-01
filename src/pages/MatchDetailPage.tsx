import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MatchDetailPage.css';

const MatchDetailPage = () => {
  const { matchId } = useParams();
  // Estados para armazenar os dados das escalações dos times
  const [homeTeamLineup, setHomeTeamLineup] = useState(null);
  const [awayTeamLineup, setAwayTeamLineup] = useState(null);
  // Estados para controle de carregamento e erros
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLineups = async () => {
      try {
        // Faz a requisição para a API de escalações da partida
        const res = await fetch(`http://127.0.0.1:8000/api/matches/lineups/${matchId}/`);
        
        // Verifica se a resposta da rede foi bem-sucedida
        if (!res.ok) {
          throw new Error(`Erro HTTP! Status: ${res.status}`);
        }

        // Converte a resposta para JSON
        const data = await res.json();

        // A resposta da API tem a estrutura { response: [...] }
        // Verificamos se 'response' é um array e se contém pelo menos dois elementos (para os dois times)
        if (data.response && Array.isArray(data.response) && data.response.length >= 2) {
          // O primeiro objeto no array 'response' é o time da casa
          setHomeTeamLineup(data.response[0]);
          // O segundo objeto no array 'response' é o time visitante
          setAwayTeamLineup(data.response[1]);
        } else {
          // Se o formato dos dados for inesperado ou não houver dados suficientes
          setError('Formato de dados inesperado ou dados insuficientes para dois times.');
          console.error('Formato de dados inesperado:', data);
        }
      } catch (err) {
        // Captura e define qualquer erro que ocorra durante a requisição
        console.error('Erro na requisição:', err);
        setError('Falha ao carregar escalações da partida. Verifique a conexão ou o ID da partida.');
      } finally {
        // Define loading como false, independentemente do sucesso ou falha
        setLoading(false);
      }
    };

    // Chama a função fetchLineups quando o componente é montado ou matchId muda
    fetchLineups();
  }, [matchId]); // O useEffect será re-executado se o matchId mudar

  // Renderização condicional para estados de carregamento
  if (loading) {
    return (
      <div className="main-content">
        <p className="loading-text">Carregando escalações da partida...</p>
      </div>
    );
  }

  // Renderização condicional para estados de erro
  if (error) {
    return (
      <div className="main-content">
        <p className="error-text">Erro: {error}</p>
      </div>
    );
  }

  // Se não há dados de escalações após o carregamento
  if (!homeTeamLineup || !awayTeamLineup) {
    return (
      <div className="main-content">
        <p className="no-data-text">Dados das escalações não disponíveis ou incompletos.</p>
      </div>
    );
  }

  // Função para renderizar uma lista de jogadores
  const renderPlayerList = (players, title) => {
    if (!players || players.length === 0) {
      return (
        <div className="player-section">
          <h4>{title}</h4>
          <p>Nenhum jogador encontrado</p>
        </div>
      );
    }

    return (
      <div className="player-section">
        <h4>{title}</h4>
        {players.map((playerObj, index) => (
          <div key={index} className="player-item">
            <span className="player-position">{playerObj.player.pos}</span>
            <span className="player-number">#{playerObj.player.number}</span>
            <span className="player-name">{playerObj.player.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="main-content">
      {/* Cabeçalho com logos e nomes dos times */}
      <div className="match-header">
        <div className="team-info">
          <img 
            src={homeTeamLineup.team.logo} 
            alt={`${homeTeamLineup.team.name} logo`}
            className="team-logo"
          />
          <h2>{homeTeamLineup.team.name}</h2>
          <p className="formation">Formação: {homeTeamLineup.formation}</p>
        </div>
        
        <div className="vs-separator">
          <span>VS</span>
        </div>
        
        <div className="team-info">
          <img 
            src={awayTeamLineup.team.logo} 
            alt={`${awayTeamLineup.team.name} logo`}
            className="team-logo"
          />
          <h2>{awayTeamLineup.team.name}</h2>
          <p className="formation">Formação: {awayTeamLineup.formation}</p>
        </div>
      </div>

      {/* Tabela de escalações */}
      <div className="lineups-container">
        <div className="lineups-table">
          <div className="team-column">
            <h3>{homeTeamLineup.team.name}</h3>
            
            {renderPlayerList(homeTeamLineup.startXI, "Escalação Inicial")}
            {renderPlayerList(homeTeamLineup.substitutes, "Reservas")}
            
            <div className="coach-section">
              <h4>Treinador</h4>
              <div className="coach-item">
                <img 
                  src={homeTeamLineup.coach.photo} 
                  alt={`${homeTeamLineup.coach.name} photo`}
                  className="coach-photo"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="coach-name">{homeTeamLineup.coach.name}</span>
              </div>
            </div>
          </div>

          <div className="team-column">
            <h3>{awayTeamLineup.team.name}</h3>
            
            {renderPlayerList(awayTeamLineup.startXI, "Escalação Inicial")}
            {renderPlayerList(awayTeamLineup.substitutes, "Reservas")}
            
            <div className="coach-section">
              <h4>Treinador</h4>
              <div className="coach-item">
                <img 
                  src={awayTeamLineup.coach.photo} 
                  alt={`${awayTeamLineup.coach.name} photo`}
                  className="coach-photo"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="coach-name">{awayTeamLineup.coach.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailPage;