import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import FormField from '../components/UI/FormField';
import { useAuth } from '../state/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(form.email, form.password);
      const from = (location.state as any)?.from?.pathname || '/app';
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        autoComplete="email"
        error={error && !form.email ? 'Email is required' : undefined}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        autoComplete="current-password"
        error={error && !form.password ? 'Password is required' : undefined}
      />
      {error && <div style={{ color: '#f87171', marginBottom: 12 }}>{error}</div>}
      <Button type="submit" loading={loading}>
        Login
      </Button>
      <div style={{ marginTop: 16 }}>
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </form>
  );
};

export default LoginPage;
