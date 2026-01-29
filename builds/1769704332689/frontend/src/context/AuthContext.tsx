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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      getCurrentUser().then(setUser).catch(() => setIsAuthenticated(false));
    }
  }, [token]);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await login(email, password);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const data = await register(email, password, name);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setError('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setToken(null);
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      setError('Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    // Implement token refresh logic
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, error, login: handleLogin, signup: handleSignup, logout: handleLogout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};