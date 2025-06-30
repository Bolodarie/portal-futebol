import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Portal Futebol
        </Link>
        
        <SearchBar />

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Jogos do Dia
            </Link>
          </li>
          
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/favoritos" className="nav-links">
                  Favoritos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" className="nav-links">
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                <a href="#" onClick={handleLogout} className="nav-links">
                  Sair
                </a>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-links">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;