import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import apiClient from '@/api/axiosConfig';
import './SearchResultsPage.css';

// Interfaces para os dados que vêm do backend
interface Player {
  id: number;
  name: string;
  photo: string;
  team_name: string;
}

interface Team {
  id: number;
  name: string;
  logo: string;
  country: string;
}

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(`/api/search/?q=${query}`);
        setPlayers(response.data.players || []);
        setTeams(response.data.teams || []);
      } catch (err) {
        setError('Não foi possível realizar a busca.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const totalResults = players.length + teams.length;

  if (loading) {
    return <div className="main-content"><p>A procurar...</p></div>;
  }

  if (error) {
    return <div className="main-content"><p>{error}</p></div>;
  }

  return (
    <div className="main-content">
      <h2>Resultados da Busca por: "{query}"</h2>
      <p>{totalResults > 0 ? `${totalResults} resultado(s) encontrado(s).` : 'Nenhum resultado encontrado.'}</p>

      <div className="results-grid">
        {/* Secção de Jogadores */}
        {players.length > 0 && (
          <div className="results-category">
            <h3>Jogadores</h3>
            {players.map(player => (
              <Link to={`/jogador/${player.id}`} key={`player-${player.id}`} className="result-item-rich">
                <img src={player.photo} alt={player.name} className="result-image" />
                <div className="result-text">
                  <span className="result-name">{player.name}</span>
                  <span className="result-subtext">{player.team_name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Secção de Times */}
        {teams.length > 0 && (
          <div className="results-category">
            <h3>Times</h3>
            {teams.map(team => (
              <Link to={`/time/${team.id}`} key={`team-${team.id}`} className="result-item-rich">
                <img src={team.logo} alt={team.name} className="result-image" />
                <div className="result-text">
                  <span className="result-name">{team.name}</span>
                  <span className="result-subtext">{team.country}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;