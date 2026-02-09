import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient, { login, register } from '@/utils/apiClient';

interface AuthContextType {
  user: any;
  token: string | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await apiClient.getCurrentUser();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async (data: any) => {
    const response = await login(data);
    setToken(response.accessToken);
    setUser(response.user);
  };

  const handleSignup = async (data: any) => {
    const response = await register(data);
    setToken(response.accessToken);
    setUser(response.user);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login: handleLogin, signup: handleSignup, logout: handleLogout }}>
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
