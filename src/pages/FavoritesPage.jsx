import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SearchResultsPage.css';

const FavoritesPage = () => {
  // Estado para armazenar os favoritos, o status de carregamento e os erros
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtém a função para pegar o token de autenticação do contexto
  const { getToken } = useAuth();

  useEffect(() => {
    // Função assíncrona para buscar os favoritos da API
    const fetchFavorites = async () => {
      setLoading(true); // Inicia o carregamento
      setError(null);   // Limpa erros anteriores

      const token = getToken();

      // Se não houver token, não podemos fazer a requisição
      if (!token) {
        setError("Você precisa estar logado para ver seus favoritos.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/favoritos/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`, // Adiciona o token ao cabeçalho
          },
        });

        // Verifica se a resposta da API foi bem-sucedida
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText} (Status: ${response.status})`);
        }

        const data = await response.json();
        console.log(data)
        setFavorites(data); // Salva os dados no estado

      } catch (err) {
        // Captura e salva qualquer erro que ocorra durante a chamada
        setError(err.message);
        console.error("Falha ao buscar favoritos:", err);
      } finally {
        // Garante que o loading seja desativado ao final, com sucesso ou erro
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [getToken]); // A dependência getToken garante que a função seja recriada se o contexto de autenticação mudar

  // Renderiza a mensagem de carregamento
  if (loading) {
    return <div className="main-content"><p>Carregando seus favoritos...</p></div>;
  }

  // Renderiza a mensagem de erro, se houver
  if (error) {
    return <div className="main-content"><p>Ocorreu um erro: {error}</p></div>;
  }

  // Renderização principal do componente
  return (
    <div className="main-content">
      <h2>Meus Favoritos</h2>
      
      {favorites.length === 0 ? (
        <p>Você ainda não adicionou nenhum favorito. Navegue pelo site e clique em "Adicionar aos Favoritos" para começar!</p>
      ) : (
        <div className="results-grid">
          <div className="results-category">
            {favorites.map(item => (
              // Assumindo que a API retorna 'id', 'name', 'type' e 'path'
              <Link to={`/jogador/${item.IdJogador}`} key={`${item.id}-${item.IdJogador}`} className="result-item">
                <img src={`https://media.api-sports.io/football/players/${item.IdJogador}.png`}  alt={`${item.Nome}`} className='player-pic' />
                <div className='fav-text'>
                    <strong>{item.Nome}</strong>
                    <span style={{textTransform: 'capitalize', color: '#888', fontSize: '12px', marginLeft: '0.4rem'}}>({item.Posicao})</span>
                    <label style={{marginLeft: '0.4rem'}}>{item.Nacionalidade}</label>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;