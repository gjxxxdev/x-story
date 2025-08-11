// auth/AuthContext.tsx
import React, { createContext, useContext } from "react";

type AuthContextValue = {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  logout: () => Promise<void> | void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: AuthContextValue;
}) => <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
