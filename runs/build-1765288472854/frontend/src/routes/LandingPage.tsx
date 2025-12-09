import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import styles from './LandingPage.module.css';

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className={styles.landing}>
      <h1>Welcome to AI App SaaS</h1>
      <p className={styles.subtitle}>Your AI-powered productivity platform.</p>
      {!user ? (
        <div className={styles.ctaButtons}>
          <Link to="/register" className={styles.cta}>Get Started</Link>
          <Link to="/login" className={styles.ctaOutline}>Login</Link>
        </div>
      ) : (
        <div className={styles.ctaButtons}>
          <Link to="/dashboard" className={styles.cta}>Go to Dashboard</Link>
        </div>
      )}
    </div>
  );
};

export default LandingPage;

