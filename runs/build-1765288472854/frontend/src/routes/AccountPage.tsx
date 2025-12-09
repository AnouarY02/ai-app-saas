import React, { useEffect, useState } from 'react';
import { useProfile } from '../state/useProfile';
import { useAuth } from '../state/AuthContext';
import FormField from '../components/FormField';
import styles from './AccountPage.module.css';

const AccountPage: React.FC = () => {
  const { profile, loading, error, fetchProfile, updateProfile } = useProfile();
  const { user } = useAuth();
  const [name, setName] = useState(profile?.name || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email);
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setSubmitting(true);
    try {
      await updateProfile({ name, email, password: password || undefined });
      setFormSuccess('Profile updated successfully');
      setPassword('');
    } catch (err: any) {
      setFormError(err.message || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.accountPage}>
      <h2>Account Settings</h2>
      {loading && <div>Loading profile...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {profile && (
        <form onSubmit={handleSubmit} className={styles.form} autoComplete="on">
          <FormField
            label="Name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
          />
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
            label="New Password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          {formError && <div className={styles.error}>{formError}</div>}
          {formSuccess && <div className={styles.success}>{formSuccess}</div>}
          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AccountPage;

