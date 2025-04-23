// services/api.js
import axios from "axios";
import { getAccessToken } from "./authService";

const API_URL = "https://api.whale.com/v1"; // Substitua pelo URL da sua API

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token de acesso em todas as requisições
api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se o erro for 401 (não autorizado), podemos tentar renovar o token
    // Esta lógica já está implementada no authService.js
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Forçar uma verificação de autenticação que tentará renovar o token
        const isValid = await isAuthenticated();

        if (isValid) {
          // Se renovamos o token com sucesso, obter o novo token
          const newToken = await getAccessToken();
          // Configurar o novo token para a requisição original
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          // Reenviar a requisição original com o novo token
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Erro ao renovar token:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
