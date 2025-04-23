import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://seu-backend-url.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para lidar com erros de resposta
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se o erro for 401 (Unauthorized) e não estamos tentando renovar o token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Renovar token
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });

        const { token } = response.data;
        await SecureStore.setItemAsync("token", token);

        // Reenviar requisição original com novo token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (err) {
        // Se falhar na renovação, redireciona para login
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("refreshToken");
        // Aqui você poderia adicionar lógica para redirecionar para tela de login
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
