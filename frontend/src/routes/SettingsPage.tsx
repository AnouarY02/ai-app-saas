import React, { useEffect, useState } from 'react';
import { useAuth } from '../state/AuthContext';
import { updateProfile, getProfile } from '../utils/apiClient';

const SettingsPage: React.FC = () => {
  const { user, setUser, token } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Refresh profile on mount
    const fetchProfile = async () => {
      try {
        if (!token) return;
        const profile = await getProfile(token);
        setName(profile.name || '');
        setEmail(profile.email);
        setUser(profile);
      } catch (err: any) {
        setError('Failed to load profile.');
      }
    };
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      if (!token) throw new Error('Not authenticated');
      const updated = await updateProfile(token, { name, email, password: password || undefined });
      setUser(updated);
      setSuccess('Profile updated successfully.');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span>Name</span>
          <input
            type="text"
            className="border rounded px-3 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Email</span>
          <input
            type="email"
            className="border rounded px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>New Password (leave blank to keep current)</span>
          <input
            type="password"
            className="border rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
