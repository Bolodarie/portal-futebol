// Arquivo: src/api/axiosConfig.js
import axios from 'axios';

const apiClient = axios.create({
  // A URL base do seu backend em Python/Django
  baseURL: 'http://localhost:8000', // A porta padrão do Django é 8000
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;