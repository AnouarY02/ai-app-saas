import React, { createContext, useState, useContext, ReactNode } from 'react';
import { login, register, logout, getCurrentUser, User } from '../utils/apiClient';

interface AuthContextType {
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token, user } = await login(email, password);
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const { token, user } = await register(email, password);
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
    } catch (err) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
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
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, loading, error, login: handleLogin, signup: handleSignup, logout: handleLogout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};