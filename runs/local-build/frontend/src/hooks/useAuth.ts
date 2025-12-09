import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@shared/utils/apiClient";
import type { UserProfile, LoginRequest, LoginResponse } from "@shared/types";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (data: LoginRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchMe = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get<UserProfile>("/api/auth/me");
      setUser(res.data);
      setError(null);
    } catch (err: any) {
      setUser(null);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
    // eslint-disable-next-line
  }, []);

  const login = async (data: LoginRequest) => {
    setLoading(true);
    try {
      const res = await apiClient.post<LoginResponse>("/api/auth/login", data);
      setUser(res.data.user);
      setError(null);
      navigate("/", { replace: true });
      return true;
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Login failed. Please check your credentials."
      );
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await apiClient.post("/api/auth/logout", {});
    } catch (err) {
      // ignore
    } finally {
      setUser(null);
      setError(null);
      setLoading(false);
      navigate("/login", { replace: true });
    }
  };

  const refresh = async () => {
    await fetchMe();
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, error, login, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

