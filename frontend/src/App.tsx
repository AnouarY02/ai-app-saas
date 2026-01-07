import React, { useEffect, useState, createContext, useContext } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { login, logout, getMe, getDashboardData, getSettings, updateSettings } from './lib/api';

// Types
interface UserPublic {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: UserPublic | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserPublic | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    getMe(token)
      .then(u => {
        setUser(u);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        setLoading(false);
      });
  }, [token]);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const resp = await login(email, password);
      setToken(resp.token);
      localStorage.setItem('token', resp.token);
      setUser(resp.user);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      try { await logout(token); } catch {}
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Layouts
const mainLayoutStyle: React.CSSProperties = {
  display: 'flex',
  minHeight: '100vh',
  background: '#f9f9fb',
};
const sidebarStyle: React.CSSProperties = {
  width: 220,
  background: '#181c24',
  color: '#fff',
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
};
const contentStyle: React.CSSProperties = {
  flex: 1,
  padding: '2rem',
};
const navLinkStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 500,
  marginBottom: 16,
  display: 'block',
  padding: '0.5rem 1rem',
  borderRadius: 6,
};
const navLinkActiveStyle: React.CSSProperties = {
  background: '#23283b',
};
const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 32,
};

import { Link, NavLink } from 'react-router-dom';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div style={mainLayoutStyle}>
      <aside style={sidebarStyle}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32 }}>ai-app</div>
        <nav>
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({ ...navLinkStyle, ...(isActive ? navLinkActiveStyle : {}) })}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/settings"
            style={({ isActive }) => ({ ...navLinkStyle, ...(isActive ? navLinkActiveStyle : {}) })}
          >
            Settings
          </NavLink>
        </nav>
        <div style={{ marginTop: 'auto' }}>
          {user && (
            <button
              style={{
                width: '100%',
                padding: '0.5rem',
                background: '#ff5252',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 500,
              }}
              onClick={async () => {
                await logout();
                navigate('/login');
              }}
            >
              Logout
            </button>
          )}
        </div>
      </aside>
      <main style={contentStyle}>{children}</main>
    </div>
  );
};

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f9f9fb',
  }}>
    <div style={{
      minWidth: 340,
      maxWidth: 400,
      background: '#fff',
      padding: '2.5rem 2rem',
      borderRadius: 12,
      boxShadow: '0 2px 16px rgba(24,28,36,0.08)',
    }}>
      {children}
    </div>
  </div>
);

const PlainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f9fb' }}>
    {children}
  </div>
);

// Pages
const LandingPage: React.FC = () => (
  <div>
    <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Welcome to ai-app</h1>
    <p style={{ fontSize: 18, marginBottom: 32 }}>Your SaaS platform for AI-powered productivity.</p>
    <Link to="/login" style={{
      display: 'inline-block',
      background: '#23283b',
      color: '#fff',
      padding: '0.75rem 2rem',
      borderRadius: 6,
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: 18,
    }}>Login to get started</Link>
  </div>
);

const LoginPage: React.FC = () => {
  const { login, loading, token } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) navigate('/dashboard');
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Invalid email or password.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 24 }}>Login</h2>
      <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d3d6e0',
            borderRadius: 6,
            fontSize: 16,
            marginBottom: 6,
          }}
        />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d3d6e0',
            borderRadius: 6,
            fontSize: 16,
            marginBottom: 6,
          }}
        />
      </div>
      {error && <div style={{ color: '#ff5252', marginBottom: 12 }}>{error}</div>}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '0.75rem',
          background: '#23283b',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          fontWeight: 600,
          fontSize: 18,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

const DashboardPage: React.FC = () => {
  const { token, user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getDashboardData(token)
      .then(setData)
      .catch(() => setError('Failed to load dashboard data.'))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div style={{ color: '#ff5252' }}>{error}</div>;

  return (
    <div>
      <div style={headerStyle}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Dashboard</h1>
        <div style={{ fontSize: 18, fontWeight: 500 }}>Welcome, {user?.name || user?.email}!</div>
      </div>
      <div>
        {/* Render dashboard data here */}
        <pre style={{ background: '#f4f6fa', padding: 16, borderRadius: 8 }}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

const SettingsPage: React.FC = () => {
  const { token } = useAuth();
  const [settings, setSettings] = useState<any>(null);
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getSettings(token)
      .then(s => {
        setSettings(s);
        setPreferences(JSON.stringify(s.preferences, null, 2));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load settings.');
        setLoading(false);
      });
  }, [token]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSaving(true);
    try {
      const parsed = JSON.parse(preferences);
      await updateSettings(token!, { preferences: parsed });
      setSuccess(true);
    } catch (err: any) {
      setError('Invalid JSON or failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading settings...</div>;
  return (
    <form onSubmit={handleSave}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Settings</h1>
      <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Preferences (JSON)</label>
        <textarea
          value={preferences}
          onChange={e => setPreferences(e.target.value)}
          rows={8}
          style={{
            width: '100%',
            padding: 12,
            border: '1px solid #d3d6e0',
            borderRadius: 6,
            fontFamily: 'monospace',
            fontSize: 15,
          }}
        />
      </div>
      {error && <div style={{ color: '#ff5252', marginBottom: 10 }}>{error}</div>}
      {success && <div style={{ color: '#4caf50', marginBottom: 10 }}>Settings updated!</div>}
      <button
        type="submit"
        disabled={saving}
        style={{
          padding: '0.6rem 2rem',
          background: '#23283b',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          fontWeight: 600,
          fontSize: 17,
          cursor: saving ? 'not-allowed' : 'pointer',
        }}
      >
        {saving ? 'Saving...' : 'Save Settings'}
      </button>
    </form>
  );
};

const ErrorPage: React.FC = () => (
  <div style={{ textAlign: 'center' }}>
    <h1 style={{ fontSize: 38, fontWeight: 700, color: '#ff5252', marginBottom: 12 }}>Something went wrong</h1>
    <p style={{ fontSize: 18, marginBottom: 24 }}>An error occurred. Please try again or contact support.</p>
    <Link to="/" style={{
      background: '#23283b',
      color: '#fff',
      padding: '0.7rem 2rem',
      borderRadius: 6,
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: 17,
    }}>Back to Home</Link>
  </div>
);

// Route protection
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
};

// App Router
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
        {/* Login page */}
        <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
        {/* Dashboard (protected) */}
        <Route path="/dashboard" element={
          <RequireAuth>
            <MainLayout><DashboardPage /></MainLayout>
          </RequireAuth>
        } />
        {/* Settings (protected) */}
        <Route path="/settings" element={
          <RequireAuth>
            <MainLayout><SettingsPage /></MainLayout>
          </RequireAuth>
        } />
        {/* Error page */}
        <Route path="/error" element={<PlainLayout><ErrorPage /></PlainLayout>} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
