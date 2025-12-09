import React, { useEffect } from 'react';
import { useAuth } from '../state/AuthContext';
import { useProfile } from '../state/useProfile';
import styles from './DashboardPage.module.css';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { profile, loading, error, fetchProfile } = useProfile();

  useEffect(() => {
    if (!profile) fetchProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      {loading && <div>Loading profile...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {profile && (
        <div className={styles.profileBox}>
          <div><strong>Name:</strong> {profile.name || user?.name || '—'}</div>
          <div><strong>Email:</strong> {profile.email}</div>
          <div><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</div>
        </div>
      )}
      <div className={styles.info}>
        <p>Welcome to your AI App SaaS dashboard. More features coming soon!</p>
      </div>
    </div>
  );
};

export default DashboardPage;

