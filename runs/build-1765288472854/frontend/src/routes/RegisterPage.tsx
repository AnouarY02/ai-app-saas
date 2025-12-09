import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import FormField from '../components/FormField';
import styles from './AuthPage.module.css';

const RegisterPage: React.FC = () => {
  const { register, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register(email, password, name);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className={styles.authPage}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form} autoComplete="on">
        <FormField
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <FormField
          label="Name"
          name="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          autoComplete="name"
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.submitBtn} disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className={styles.switchLink}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;

