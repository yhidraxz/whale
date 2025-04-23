// services/authService.js
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_REDIRECT_URI,
  AUTH0_SCOPE,
  AUTH0_AUDIENCE,
} from "./auth0Config";

// Registrar para uso com iOS e Android
WebBrowser.maybeCompleteAuthSession();

// Chaves de armazenamento
const ACCESS_TOKEN_KEY = "whale_access_token";
const REFRESH_TOKEN_KEY = "whale_refresh_token";
const USER_INFO_KEY = "whale_user_info";

// Função para login com Auth0
export const loginWithAuth0 = async () => {
  try {
    const request = new AuthSession.AuthRequest({
      clientId: AUTH0_CLIENT_ID,
      redirectUri: AUTH0_REDIRECT_URI,
      scopes: AUTH0_SCOPE.split(" "),
      extraParams: {
        audience: AUTH0_AUDIENCE,
      },
    });

    const authUrl =
      `https://${AUTH0_DOMAIN}/authorize?` +
      `response_type=code` +
      `&client_id=${AUTH0_CLIENT_ID}` +
      `&redirect_uri=${AUTH0_REDIRECT_URI}` +
      `&scope=${AUTH0_SCOPE}` +
      `&audience=${AUTH0_AUDIENCE}`;

    const result = await request.promptAsync({
      authUrl,
      returnUrl: AuthSession.makeRedirectUri({ useProxy: true }),
    });

    if (result.type === "success") {
      // Troca o código de autorização por tokens
      const exchangeResult = await exchangeCodeForToken(result.params.code);
      await storeTokens(exchangeResult);

      // Obter informações do usuário
      const userInfo = await fetchUserInfo(exchangeResult.access_token);
      await SecureStore.setItemAsync(USER_INFO_KEY, JSON.stringify(userInfo));

      return {
        authenticated: true,
        user: userInfo,
      };
    }

    return {
      authenticated: false,
      error: "Login failed",
    };
  } catch (error) {
    console.error("Auth error:", error);
    return {
      authenticated: false,
      error: error.message,
    };
  }
};

// Trocar o código de autorização por tokens
const exchangeCodeForToken = async (code) => {
  const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: AUTH0_CLIENT_ID,
      code,
      redirect_uri: AUTH0_REDIRECT_URI,
    }),
  });

  return await response.json();
};

// Obter informações do usuário
const fetchUserInfo = async (accessToken) => {
  const response = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
};

// Armazenar tokens no SecureStore
const storeTokens = async (tokenResponse) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokenResponse.access_token);
  if (tokenResponse.refresh_token) {
    await SecureStore.setItemAsync(
      REFRESH_TOKEN_KEY,
      tokenResponse.refresh_token
    );
  }
};

// Verificar se o usuário está autenticado
export const isAuthenticated = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    if (!accessToken) return false;

    // Verifica se o token está expirado
    const decodedToken = jwt_decode(accessToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      // Tentar renovar o token
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      if (refreshToken) {
        const refreshResult = await refreshAccessToken(refreshToken);
        if (refreshResult.success) {
          return true;
        }
      }
      return false;
    }

    return true;
  } catch (error) {
    console.error("Auth check error:", error);
    return false;
  }
};

// Renovar o token de acesso
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        client_id: AUTH0_CLIENT_ID,
        refresh_token: refreshToken,
      }),
    });

    const tokenData = await response.json();
    if (tokenData.access_token) {
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokenData.access_token);
      return { success: true };
    }

    return { success: false };
  } catch (error) {
    console.error("Token refresh error:", error);
    return { success: false, error };
  }
};

// Obter o token de acesso para requisições à API
export const getAccessToken = async () => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};

// Obter informações do usuário armazenadas
export const getUserInfo = async () => {
  const userInfo = await SecureStore.getItemAsync(USER_INFO_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
};

// Determinação de função do usuário (dono ou funcionário)
export const getUserRole = async () => {
  try {
    const userInfo = await getUserInfo();
    if (!userInfo) return null;

    // Assumindo que o Auth0 armazena a função do usuário em app_metadata.role
    // Você pode precisar ajustar isso dependendo de como seu Auth0 está configurado
    const decodedToken = jwt_decode(await getAccessToken());
    return (
      decodedToken[`${AUTH0_AUDIENCE}/role`] || userInfo.role || "employee"
    );
  } catch (error) {
    console.error("Get role error:", error);
    return null;
  }
};

// Logout
export const logout = async () => {
  try {
    // Limpar tokens e dados do usuário armazenados localmente
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_INFO_KEY);

    // Redirecionar para o logout do Auth0
    const logoutUrl = `https://${AUTH0_DOMAIN}/v2/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${encodeURIComponent(
      AUTH0_REDIRECT_URI
    )}`;
    await WebBrowser.openAuthSessionAsync(logoutUrl, AUTH0_REDIRECT_URI);

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error };
  }
};
