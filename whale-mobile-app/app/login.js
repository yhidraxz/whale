// app/login.js
import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isAuthenticated, loading, userRole } = useAuth();

  useEffect(() => {
    // Redirecionar se já estiver autenticado
    if (isAuthenticated && userRole) {
      const route =
        userRole === "owner"
          ? "/(auth)/(owner)/dashboard"
          : "/(auth)/(employee)/timesheet";
      router.replace(route);
    }
  }, [isAuthenticated, userRole]);

  const handleLogin = async () => {
    const result = await login();
    if (result.authenticated) {
      // O redirecionamento será feito pelo useEffect acima
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Whale</Text>
      <Text style={styles.subtitle}>
        Gerencie suas finanças e equipe em um só lugar
      </Text>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar com Auth0</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Não tem uma conta?{" "}
        <Text
          style={styles.registerLink}
          onPress={() => router.push("/register")}
        >
          Cadastre-se
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a2a3a",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: "#0066CC",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    color: "#666",
  },
  registerLink: {
    color: "#0066CC",
    fontWeight: "bold",
  },
  loadingText: {
    marginTop: 20,
    color: "#0066CC",
    fontSize: 16,
  },
});
