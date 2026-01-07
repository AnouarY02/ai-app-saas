import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLogin, apiLogout, getStoredToken, setStoredToken, clearStoredToken, getUserFromToken } from '../utils/apiClient';

interface UserSummary {
  id: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserSummary | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      const user = getUserFromToken(token);
      setUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token, user } = await apiLogin(email, password);
      setStoredToken(token);
      setUser(user);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await apiLogout();
    } catch {}
    clearStoredToken();
    setUser(null);
    setLoading(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
