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
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        setToken(localStorage.getItem('token'));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
    } catch (err) {
      setError('Login failed');
    }
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    try {
      const response = await register(email, password, name);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
    } catch (err) {
      setError('Signup failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
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