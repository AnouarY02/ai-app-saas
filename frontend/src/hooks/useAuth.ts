import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../api/client';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = useCallback(async () => {
    setLoading(true);
    try {
      const session = await api.checkSession();
      if (session.valid && session.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.login(email, password);
      setUser(res.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.logout(''); // token is expected to be in cookie or header
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  const updateUser = (user: User) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
