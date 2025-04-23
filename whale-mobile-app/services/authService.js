import api from "./api";
import * as SecureStore from "expo-secure-store";

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token, refreshToken, user } = response.data;

    await SecureStore.setItemAsync("token", token);
    await SecureStore.setItemAsync("refreshToken", refreshToken);

    return user;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Erro ao fazer logout no servidor:", error);
  } finally {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("refreshToken");
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
