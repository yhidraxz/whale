// app/(auth)/*layout.js
import React, { useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated, loading, userRole } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    } else if (!loading && isAuthenticated && userRole) {
      // Redirecionar para a área correta baseada na função do usuário
      if (userRole === "owner" && !router.pathname.includes("/(owner)")) {
        router.replace("/(auth)/(owner)/dashboard");
      } else if (
        userRole === "employee" &&
        !router.pathname.includes("/(employee)")
      ) {
        router.replace("/(auth)/(employee)/timesheet");
      }
    }
  }, [isAuthenticated, loading, userRole]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text style={{ marginTop: 20, color: "#0066CC" }}>Carregando...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return null; // Não renderizar nada enquanto redireciona
  }

  return children;
}
