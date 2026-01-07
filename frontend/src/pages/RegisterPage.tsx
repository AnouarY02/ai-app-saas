import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import FormField from '../components/UI/FormField';
import { useAuth } from '../state/AuthContext';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
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
      await register(form.name, form.email, form.password);
      navigate('/app', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      <FormField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        autoComplete="name"
        error={error && !form.name ? 'Name is required' : undefined}
      />
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
        autoComplete="new-password"
        error={error && !form.password ? 'Password is required' : undefined}
      />
      {error && <div style={{ color: '#f87171', marginBottom: 12 }}>{error}</div>}
      <Button type="submit" loading={loading}>
        Register
      </Button>
      <div style={{ marginTop: 16 }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </form>
  );
};

export default RegisterPage;
