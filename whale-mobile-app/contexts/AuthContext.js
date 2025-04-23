// contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import {
  loginWithAuth0,
  isAuthenticated,
  getUserInfo,
  logout,
  getUserRole,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Verificar autenticação ao iniciar
    const checkAuth = async () => {
      setLoading(true);
      const authenticated = await isAuthenticated();

      if (authenticated) {
        const userInfo = await getUserInfo();
        setUser(userInfo);

        const role = await getUserRole();
        setUserRole(role);
      } else {
        setUser(null);
        setUserRole(null);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async () => {
    setLoading(true);
    const result = await loginWithAuth0();

    if (result.authenticated) {
      setUser(result.user);
      const role = await getUserRole();
      setUserRole(role);
    }

    setLoading(false);
    return result;
  };

  const signOut = async () => {
    const result = await logout();
    if (result.success) {
      setUser(null);
      setUserRole(null);
    }
    return result;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout: signOut,
        isAuthenticated: !!user,
        userRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
