import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "@/utils/apiClient";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "admin" | "medewerker";
  active: boolean;
}

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  loading: boolean;
  isAdmin: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) { setLoading(false); return; }
      try {
        const response = await apiClient.get("/api/auth/me");
        const data = response.data;
        // JWT /me returns decoded token payload: { id, email, role }
        // Enrich with full user from users endpoint if possible
        setUser({ id: data.id, name: data.name || data.email, email: data.email, role: data.role, active: true });
      } catch {
        localStorage.removeItem("token");
        setToken(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogin = async (data: { email: string; password: string }) => {
    const response = await apiClient.post("/api/auth/login", data);
    const { token: t, user: u } = response.data;
    localStorage.setItem("token", t);
    setToken(t);
    setUser(u);
  };

  const handleSignup = async (data: { name: string; email: string; password: string }) => {
    const response = await apiClient.post("/api/auth/register", data);
    const { token: t, user: u } = response.data;
    localStorage.setItem("token", t);
    setToken(t);
    setUser(u);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, token, loading, isAdmin, login: handleLogin, signup: handleSignup, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
