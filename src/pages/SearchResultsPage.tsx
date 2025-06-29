import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { mockDatabase } from '../mocks/mockDatabase';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q').toLowerCase();

  const filteredJogadores = mockDatabase.jogadores.filter(j => j.nome.toLowerCase().includes(query));
  const filteredTimes = mockDatabase.times.filter(t => t.nome.toLowerCase().includes(query));
  const filteredCompeticoes = mockDatabase.competicoes.filter(c => c.nome.toLowerCase().includes(query));

  const totalResults = filteredJogadores.length + filteredTimes.length + filteredCompeticoes.length;

  return (
    <div className="main-content">
      <h2>Resultados da Busca por: "{query}"</h2>
      <p>{totalResults} resultado(s) encontrado(s).</p>

      <div className="results-grid">
        {filteredJogadores.length > 0 && (
          <div className="results-category">
            <h3>Jogadores</h3>
            {filteredJogadores.map(jogador => (
              <Link to={`/jogador/${jogador.id}`} key={jogador.id} className="result-item">
                {jogador.nome} ({jogador.time})
              </Link>
            ))}
          </div>
        )}

        {filteredTimes.length > 0 && (
          <div className="results-category">
            <h3>Times</h3>
            {filteredTimes.map(time => (
              <Link to={`/time/${time.id}`} key={time.id} className="result-item">
                {time.nome}
              </Link>
            ))}
          </div>
        )}

        {filteredCompeticoes.length > 0 && (
          <div className="results-category">
            <h3>Competições</h3>
            {filteredCompeticoes.map(comp => (
              <Link to={`/competicao/${comp.id}`} key={comp.id} className="result-item">
                {comp.nome}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;