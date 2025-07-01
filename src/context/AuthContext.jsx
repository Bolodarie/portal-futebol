import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('authToken');
    return !!token;
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('userData');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      return null;
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Função para fazer login com o backend
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro no login');
      }

      const data = await response.json();
      
      // Armazenar token e dados do usuário
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      setIsLoggedIn(true);
      setUser(data.user);
      
      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Função para fazer logout
  const logout = async () => {
    try {
      const token = getToken();
      if (token) {
        // Chamar endpoint de logout no backend para invalidar o token
        await fetch('/api/auth/logout/', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Limpar dados locais independente do resultado da requisição
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  // Função para obter o token
  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  // Função para verificar se o usuário está autenticado
  const checkAuthStatus = async () => {
    const token = getToken();
    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      return false;
    }

    try {
      const response = await fetch('/api/auth/user/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('userData', JSON.stringify(userData));
        return true;
      } else {
        // Token inválido, fazer logout
        logout();
        return false;
      }
    } catch (error) {
      console.error('Auth check error:', error);
      logout();
      return false;
    }
  };

  // Interceptor para requisições autenticadas
  const authenticatedFetch = async (url, options = {}) => {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token available');
    }

    const authOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, authOptions);
    
    // Se retornar 401, o token pode estar inválido
    if (response.status === 401) {
      console.warn('Authentication failed, logging out...');
      logout();
      throw new Error('Authentication failed');
    }
    
    return response;
  };

  // Verificar autenticação ao inicializar o contexto
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      checkAuthStatus();
    }
  }, []);

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
    user,
    login,
    logout,
    getToken,
    checkAuthStatus,
    authenticatedFetch,
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

export const useAuth = () => {
  return useContext(AuthContext);
};