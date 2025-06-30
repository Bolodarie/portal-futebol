import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
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


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Nossas rotas existentes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/favoritos" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/time/:id" element={<TeamDetailPage />} />
        <Route path="/jogador/:id" element={<PlayerDetailPage />} />
        <Route path="/competicao/:id" element={<CompetitionDetailPage />} />

        {/* 2. ADICIONE A ROTA 404 NO FINAL */}
        {/* O path="*" funciona como um "catch-all" para qualquer URL não correspondida */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;