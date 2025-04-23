// services/auth0Config.js
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";

// Configure seu domínio Auth0 e clientId
export const AUTH0_DOMAIN = "seu-dominio.auth0.com";
export const AUTH0_CLIENT_ID = "seu-client-id";
export const AUTH0_REDIRECT_URI = AuthSession.makeRedirectUri({
  useProxy: true,
  scheme: "whale",
});

export const AUTH0_SCOPE = "openid profile email";
export const AUTH0_AUDIENCE = "https://api.whale.com"; // Seu API audience no Auth0
