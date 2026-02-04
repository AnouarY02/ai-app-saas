import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '@/utils/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const userData = await apiClient.getCurrentUser();
          setUser(userData);
        } catch (err) {
          setError(err.message);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const { token, user } = await apiClient.login(email, password);
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
    } catch (err) {
      setError(err.message);
    }
  };

  const signup = async (email, password, name) => {
    try {
      const { token, user } = await apiClient.register(email, password, name);
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    await apiClient.logout();
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const refresh = async () => {
    try {
      const { token } = await apiClient.refreshToken();
      setToken(token);
      localStorage.setItem('token', token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, loading, error, login, signup, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);