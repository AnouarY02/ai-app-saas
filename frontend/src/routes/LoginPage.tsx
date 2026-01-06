import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
