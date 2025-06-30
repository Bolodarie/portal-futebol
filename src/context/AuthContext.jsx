import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Cria o Contexto (nenhuma mudança aqui)
const AuthContext = createContext();

// 2. Cria o Provedor do Contexto
export const AuthProvider = ({ children }) => {
  // --- MUDANÇA 1: ESTADO INICIAL LENDO DO LOCALSTORAGE ---
  // Usamos uma função no useState para que esta lógica rode apenas uma vez, na inicialização.
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Verificamos se 'isLoggedIn' existe e é 'true' no localStorage.
    const savedState = localStorage.getItem('isLoggedIn');
    return savedState === 'true'; // localStorage só guarda strings, por isso comparamos com 'true'
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      // Tentamos buscar e converter a lista de favoritos do localStorage.
      const savedFavorites = localStorage.getItem('favorites');
      // Se existir, converte de string JSON para array. Senão, retorna um array vazio.
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      // Em caso de erro na conversão, retorna um array vazio por segurança.
      console.error("Failed to parse favorites from localStorage", error);
      return [];
    }
  });

  // --- MUDANÇA 2: EFEITOS PARA SALVAR NO LOCALSTORAGE AUTOMATICAMENTE ---

  // Este useEffect roda toda vez que o estado 'isLoggedIn' muda.
  useEffect(() => {
    // Salva o estado de login atual no localStorage.
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  // Este useEffect roda toda vez que a lista de 'favorites' muda.
  useEffect(() => {
    // Converte o array de favoritos para uma string JSON e salva no localStorage.
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);


  // O resto do código permanece o mesmo!
  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
  };

  const addFavorite = (item) => {
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

// Hook customizado (nenhuma mudança aqui)
export const useAuth = () => {
  return useContext(AuthContext);
};