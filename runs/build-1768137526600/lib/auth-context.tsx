"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  login: (data: { email: string; name: string }) => Promise<void>;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  refreshUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  async function login({ email, name }: { email: string; name: string }) {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    });
    if (!res.ok) {
      throw new Error('Login mislukt');
    }
    const data = await res.json();
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    router.push('/dashboard');
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  }

  async function refreshUser() {
    if (!user) return;
    const res = await fetch('/api/users');
    if (!res.ok) return;
    const users = await res.json();
    const fresh = users.find((u: User) => u.id === user.id);
    if (fresh) {
      setUser(fresh);
      localStorage.setItem('user', JSON.stringify(fresh));
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

