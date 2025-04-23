// app/*layout.js
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import { FinanceProvider } from "../contexts/financeContext";
import { TeamProvider } from "../contexts/teamContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <FinanceProvider>
        <TeamProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </TeamProvider>
      </FinanceProvider>
    </AuthProvider>
  );
}
