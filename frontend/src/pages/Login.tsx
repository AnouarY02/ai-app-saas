import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginRequest, LoginResponse } from 'shared/src/types';
import { apiClient } from 'shared/src/utils/apiClient';
import { useAuth } from '../state/AuthContext';
import './Login.css';

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginRequest>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.post<LoginResponse>('/api/auth/login', form);
      setAuth({
        user: res.data.user,
        token: res.data.token,
      });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit} autoComplete="on">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          autoFocus
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <div className="login-error">{error}</div>}
        <button type="submit" disabled={loading} className="login-btn">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
