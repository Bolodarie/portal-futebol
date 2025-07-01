import React, { useEffect, useState } from 'react';
import MatchDisplay from '../components/MatchDisplay'; // Assumindo que MatchDisplay.tsx já tem CSS incorporado
import { useParams } from 'react-router-dom';
import './MatchDetailPage.css';

const MatchDetailPage = () => {
  const { matchId } = useParams();
  // Estados para armazenar os dados dos times da casa e visitante
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  // Estados para controle de carregamento e erros
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        // Faz a requisição para a API de detalhes da partida
        const res = await fetch(`http://localhost:8000/api/matches/${matchId}/`);
        
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
          setHomeTeam(data.response[0].team);
          // O segundo objeto no array 'response' é o time visitante
          setAwayTeam(data.response[1].team);
        } else {
          // Se o formato dos dados for inesperado ou não houver dados suficientes
          setError('Formato de dados inesperado ou dados insuficientes para dois times.');
          console.error('Formato de dados inesperado:', data);
        }
      } catch (err) {
        // Captura e define qualquer erro que ocorra durante a requisição
        console.error('Erro na requisição:', err);
        setError('Falha ao carregar detalhes da partida. Verifique a conexão ou o ID da partida.');
      } finally {
        // Define loading como false, independentemente do sucesso ou falha
        setLoading(false);
      }
    };

    // Chama a função fetchData quando o componente é montado ou matchId muda
    fetchMatchDetails();
  }, [matchId]); // O useEffect será re-executado se o matchId mudar

  // Renderização condicional para estados de carregamento
  if (loading) {
    return (
      <>
        <div className="main-content">
          <p className="loading-text">Carregando detalhes da partida...</p>
        </div>
      </>
    );
  }

  // Renderização condicional para estados de erro
  if (error) {
    return (
      <>
        <div className="main-content">
          <p className="error-text">Erro: {error}</p>
        </div>
      </>
    );
  }

  // Se não há dados de times após o carregamento (ex: API retornou array vazio ou menos de 2 times)
  if (!homeTeam || !awayTeam) {
    return (
      <>
        {/* Estilos básicos para o estado de dados não disponíveis */}
        <div className="main-content">
          <p className="no-data-text">Dados da partida não disponíveis ou incompletos.</p>
        </div>
      </>
    );
  }

  // Placares não estão presentes no JSON fornecido para "fixtures/statistics".
  // Usando valores padrão (0) para que o MatchDisplay possa renderizar.
  // Você precisaria de outra requisição API ou um JSON diferente para obter os placares reais.
  const homeScore = 0;
  const awayScore = 0;

  return (
    <>
      {/* Estilos CSS incorporados para o componente MatchDetailPage */}
      <div className="main-content">
        <div className="games-container">
          <MatchDisplay
            homeTeam={homeTeam}
            awayTeam={awayTeam}
          />
          {/* Você pode adicionar outros componentes ou estatísticas da partida aqui,
              acessando os dados de 'homeTeam' e 'awayTeam' e seus 'statistics' arrays.
              Exemplo para estatísticas (fora do MatchDisplay):
              <div>
                <h3>Estatísticas de {homeTeam.name}:</h3>
                <ul>
                  {homeTeam.statistics.map((stat, index) => (
                    <li key={index}>{stat.type}: {stat.value}</li>
                  ))}
                </ul>
              </div>
          */}
        </div>
      </div>
    </>
  );
};

export default MatchDetailPage;
