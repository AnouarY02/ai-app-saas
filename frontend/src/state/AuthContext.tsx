import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import apiClient from "../utils/apiClient";

interface User {
  id: string;
  email: string;
  name?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (u: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "aiapp_token";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const profile = await apiClient.get("/api/users/me");
      setUser(profile);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      apiClient.setToken(token);
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [fetchProfile]);

  const login = async (email: string, password: string) => {
    const res = await apiClient.post("/api/auth/login", { email, password });
    apiClient.setToken(res.token);
    localStorage.setItem(TOKEN_KEY, res.token);
    setUser(res.user);
  };

  const register = async (email: string, password: string, name: string) => {
    const res = await apiClient.post("/api/auth/register", { email, password, name });
    apiClient.setToken(res.token);
    localStorage.setItem(TOKEN_KEY, res.token);
    setUser(res.user);
  };

  const logout = async () => {
    try {
      await apiClient.post("/api/auth/logout", {});
    } catch {}
    apiClient.setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
