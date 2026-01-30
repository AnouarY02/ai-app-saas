import React, { createContext, useState, useContext, useEffect } from 'react';
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      getCurrentUser().then(setUser).catch(() => setUser(null));
    }
  }, [token]);

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
      await register(email, password);
      await handleLogin(email, password);
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
      setUser(null);
      setToken(null);
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