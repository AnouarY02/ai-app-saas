import React, { createContext, useState, useEffect } from 'react';
import { login, register, logout, getCurrentUser } from '../utils/apiClient';

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      getCurrentUser().then(setUser).catch(() => setToken(null)).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { token, user } = await login(email, password);
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
    } catch (err) {
      setError('Login failed');
    }
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    try {
      const { token, user } = await register(email, password, name);
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
    } catch (err) {
      setError('Signup failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
    } catch (err) {
      setError('Logout failed');
    }
  };

  const refresh = async () => {
    // Implement token refresh logic
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, loading, error, login: handleLogin, signup: handleSignup, logout: handleLogout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};