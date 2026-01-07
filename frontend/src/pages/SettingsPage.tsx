import React, { useState } from 'react';
import { useAuth } from '../state/AuthContext';
import Button from '../components/UI/Button';
import FormField from '../components/UI/FormField';
import { updateUserProfile } from '../lib/api';

const SettingsPage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await updateUserProfile({
        name: form.name,
        email: form.email,
        password: form.password || undefined
      });
      setSuccess('Profile updated!');
      refreshUser();
      setForm(f => ({ ...f, password: '' }));
    } catch (err: any) {
      setError(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h2>Settings</h2>
      <FormField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        autoComplete="name"
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        autoComplete="email"
      />
      <FormField
        label="Password (leave blank to keep current)"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        autoComplete="new-password"
      />
      {error && <div style={{ color: '#f87171', marginBottom: 12 }}>{error}</div>}
      {success && <div style={{ color: '#22c55e', marginBottom: 12 }}>{success}</div>}
      <Button type="submit" loading={loading}>
        Save Changes
      </Button>
    </form>
  );
};

export default SettingsPage;
