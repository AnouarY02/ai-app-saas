import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../utils/apiClient';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const TOKEN_KEY = 'aiapp_token';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, check session
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await api.get('/api/auth/session', { headers: { Authorization: `Bearer ${token}` } });
        if (res.data.valid) {
          setUser(res.data.user);
        } else {
          setUser(null);
          localStorage.removeItem(TOKEN_KEY);
        }
      } catch {
        setUser(null);
        localStorage.removeItem(TOKEN_KEY);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.post('/api/auth/login', { email, password });
      const { user, token } = res.data;
      setUser(user);
      localStorage.setItem(TOKEN_KEY, token);
    } catch (err: any) {
      throw err.response?.data?.message ? new Error(err.response.data.message) : err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      const res = await api.post('/api/auth/register', { email, password, name });
      const { user, token } = res.data;
      setUser(user);
      localStorage.setItem(TOKEN_KEY, token);
    } catch (err: any) {
      throw err.response?.data?.message ? new Error(err.response.data.message) : err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        await api.post('/api/auth/logout', { token }, { headers: { Authorization: `Bearer ${token}` } });
      }
    } catch {
      // ignore errors
    } finally {
      setUser(null);
      localStorage.removeItem(TOKEN_KEY);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

