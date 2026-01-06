import React, { useState } from 'react';
import { useAuth } from '../state/AuthContext';
import { updateUserSettings } from '../utils/apiClient';
import './SettingsPage.css';

const SettingsPage: React.FC = () => {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = await updateUserSettings({ email, password: password || undefined });
      setUser(updated);
      setSuccess('Settings updated successfully!');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-root">
      <h1>Account Settings</h1>
      <form className="settings-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          New Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
          />
        </label>
        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        {success && <div className="form-success">{success}</div>}
        {error && <div className="form-error">{error}</div>}
      </form>
    </div>
  );
};

export default SettingsPage;
