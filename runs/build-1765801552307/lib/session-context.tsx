import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from './data/user-store';

interface UserSessionContextProps {
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
}

const UserSessionContext = createContext<UserSessionContextProps>({
  user: null,
  login: async () => {},
  logout: () => {},
});

export function UserSessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data?.user ?? null));
  }, []);

  async function login() {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    }
  }

  function logout() {
    fetch('/api/auth/logout', { method: 'POST' }).then(() => setUser(null));
  }

  return (
    <UserSessionContext.Provider value={{ user, login, logout }}>
      {children}
    </UserSessionContext.Provider>
  );
}

export function useUserSession() {
  return useContext(UserSessionContext);
}

