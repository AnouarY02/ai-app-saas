import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../api/client';
import styles from './ProfilePage.module.css';

interface EditForm {
  name: string;
  email: string;
  password: string;
}

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState<EditForm>({ name: '', email: '', password: '' });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email, password: '' });
    }
  }, [user]);

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleEdit = () => {
    setEditing(true);
    setSuccess(null);
    setError(null);
  };

  const handleCancel = () => {
    setEditing(false);
    setSuccess(null);
    setError(null);
    setForm({ name: user.name, email: user.email, password: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const update: any = { name: form.name, email: form.email };
      if (form.password) update.password = form.password;
      const updated = await api.updateProfile(update);
      updateUser(updated);
      setSuccess('Profile updated successfully.');
      setEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <h1>Your Profile</h1>
      <form className={styles.profileForm} onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            disabled={!editing}
            required
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={!editing}
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            disabled={!editing}
            placeholder="Leave blank to keep current password"
          />
        </label>
        {success && <div className={styles.success}>{success}</div>}
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.actions}>
          {!editing ? (
            <button type="button" onClick={handleEdit}>
              Edit Profile
            </button>
          ) : (
            <>
              <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button type="button" onClick={handleCancel} disabled={loading}>
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </section>
  );
};

export default ProfilePage;
