import React, { createContext, useState, useContext } from 'react';

// 1. Cria o Contexto
const AuthContext = createContext();

// 2. Cria o Provedor do Contexto (o componente que vai gerenciar e fornecer os dados)
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Funções para manipular o estado
  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    // Poderíamos limpar os favoritos ao deslogar, se quiséssemos
    // setFavorites([]); 
  };

  const addFavorite = (item) => {
    // Adiciona o item à lista se ele já não estiver lá
    setFavorites(prevFavorites => {
      if (!prevFavorites.find(fav => fav.id === item.id && fav.type === item.type)) {
        return [...prevFavorites, item];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (item) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(fav => !(fav.id === item.id && fav.type === item.type))
    );
  };
  
  // O valor que será compartilhado com os componentes filhos
  const value = {
    isLoggedIn,
    login,
    logout,
    favorites,
    addFavorite,
    removeFavorite
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Cria um Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
  return useContext(AuthContext);
};