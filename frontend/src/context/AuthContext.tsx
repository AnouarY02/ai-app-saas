import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, login, register } from '../utils/apiClient';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginHandler = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token, user } = await login(email, password);
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const registerHandler = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token, user } = await register(email, password);
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
    } catch (err) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, loading, error, login: loginHandler, register: registerHandler, logout: logoutHandler }}>
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