import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import DetailHeader from '../components/DetailHeader';
import StatCard from '../components/StatCard';
import './DetailPage.css';

const TeamDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, favorites, addFavorite, removeFavorite, getToken } = useAuth();

  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8000/api/teams/${id}/`);
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText} (Status: ${response.status})`);
        }
        const data = await response.json();
        if (data.response && data.response.length > 0) {
          setTeamData(data.response[0]);
        } else {
          throw new Error("Time não encontrado na API.");
        }
      } catch (err) {
        setError(err.message);
        console.error("Falha ao buscar detalhes do time:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamData();
  }, [id]); // Removido getToken da dependência, pois ele não deve mudar.

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!teamData) return <div>Time não encontrado!</div>;

  const { team, venue } = teamData;
  const isFavorited = favorites.some(fav => fav.id === team.id && fav.type === 'team');

  const handleFavoriteClick = async () => {
    const token = getToken(); // Pega o token de autenticação
    if (!token) {
      toast.error("Você precisa estar logado para favoritar.");
      return;
    }

    const teamItem = { id: team.id, name: team.name, type: 'team', path: `/time/${team.id}` };

    if (isFavorited) {
      // --- LÓGICA PARA REMOVER DOS FAVORITOS (DELETE) ---
      try {
        const response = await fetch(`http://localhost:8000/api/favorites/teams/${team.id}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`, // Envia o token JWT
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) { // Status 204 No Content é 'ok'
          removeFavorite(teamItem); // Atualiza o estado local no AuthContext
          toast.info(`${team.name} removido dos favoritos.`);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Falha ao remover favorito.');
        }
      } catch (err) {
        console.error("Erro ao remover favorito:", err);
        toast.error(`Erro: ${err.message}`);
      }
    } else {
      // --- LÓGICA PARA ADICIONAR AOS FAVORITOS (POST) ---
      try {
        const response = await fetch(`http://localhost:8000/api/favorites/teams/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`, // Envia o token JWT
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            IdTime: team.id,
            Nome: team.name,
            Pais: team.country, // Certifique-se que `team.country` existe no seu objeto `team`
          }),
        });

        if (response.status === 201) {
          addFavorite(teamItem); // Atualiza o estado local no AuthContext
          toast.success(`${team.name} adicionado aos favoritos.`);
        } else {
          const errorData = await response.json();
          // `unique_together` no Django pode retornar um erro específico
          const errorMessage = errorData.non_field_errors?.[0] || 'Falha ao adicionar favorito.';
          throw new Error(errorMessage);
        }
      } catch (err) {
        console.error("Erro ao adicionar favorito:", err);
        toast.error(`Erro: ${err.message}`);
      }
    }
  };

  return (
    <div className="detail-page">
      <DetailHeader
        logo={team.logo}
        name={team.name}
        country={team.country}
        subtitle={`Fundado em ${team.founded}`}
      />
      
      {isLoggedIn && (
        <button onClick={handleFavoriteClick} className="favorite-button">
          {isFavorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </button>
      )}

      <div className="stats-grid">
        <StatCard title="Estádio" value={venue.name} />
        <StatCard title="Capacidade" value={venue.capacity.toLocaleString('pt-BR')} />
        <StatCard title="Cidade" value={venue.city} />
        <StatCard title="País" value={team.country} />
      </div>

      <a onClick={() => navigate(-1)} className="back-link">
        ← Voltar
      </a>
    </div>
  );
};

export default TeamDetailPage;