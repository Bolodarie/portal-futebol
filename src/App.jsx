import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 1. IMPORTAÇÕES DA BIBLIOTECA DE TOAST
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componentes e Páginas
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
// ... (resto das suas importações de páginas)
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import FavoritesPage from './pages/FavoritesPage';
import TeamDetailPage from './pages/TeamDetailPage';
import PlayerDetailPage from './pages/PlayerDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import CompetitionDetailPage from './pages/CompetitionDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import MatchDetailPage from './pages/MatchDetailPage';


function App() {
  return (
    <Router>
      {/* 2. ADICIONE O TOASTCONTAINER AQUI */}
      {/* Ele pode ficar em qualquer lugar no topo, mas fora do <Routes> */}
      {/* Configuramos algumas opções para deixá-lo mais bonito */}
      <ToastContainer
        position="top-right"
        autoClose={3000} // Fecha automaticamente após 3 segundos
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Navbar />
      <Routes>
        {/* ... (todo o seu código de rotas permanece o mesmo) ... */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={ <ProtectedRoute><AdminPage /></ProtectedRoute> }/>
        <Route path="/favoritos" element={ <ProtectedRoute><FavoritesPage /></ProtectedRoute> } />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/time/:id" element={<TeamDetailPage />} />
        <Route path="/jogador/:id" element={<PlayerDetailPage />} />
        <Route path="/competicao/:id" element={<CompetitionDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/match/:matchId" element={<MatchDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;