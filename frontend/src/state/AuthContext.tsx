import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, registerRequest, logoutRequest, getProfile } from '../utils/apiClient';

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const TOKEN_KEY = 'aiapp_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      setToken(storedToken);
      // Try to fetch user profile
      getProfile(storedToken)
        .then(profile => {
          setUser(profile);
        })
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem(TOKEN_KEY);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { user, token } = await loginRequest(email, password);
    setUser(user);
    setToken(token);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const register = async (email: string, password: string, name?: string) => {
    const { user, token } = await registerRequest(email, password, name);
    setUser(user);
    setToken(token);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = async () => {
    if (token) {
      await logoutRequest(token);
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
