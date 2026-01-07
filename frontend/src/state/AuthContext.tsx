import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'shared/src/types';
import { apiClient } from 'shared/src/utils/apiClient';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  setAuth: (data: { user: User; token: string }) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Try to load session on mount
  useEffect(() => {
    let isMounted = true;
    apiClient
      .get('/api/auth/session')
      .then((res) => {
        if (isMounted && res.data?.user) {
          setUser(res.data.user);
          setToken(null); // Session-based, no token needed
        }
      })
      .catch(() => {
        if (isMounted) {
          setUser(null);
          setToken(null);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const setAuth = ({ user, token }: { user: User; token: string }) => {
    setUser(user);
    setToken(token);
    // Optionally store token in localStorage if JWT; for session cookies, not needed
  };

  const clearAuth = () => {
    setUser(null);
    setToken(null);
    // Optionally remove token from storage
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        token,
        loading,
        setAuth,
        clearAuth,
      }}
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
