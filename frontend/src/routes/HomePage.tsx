import React from 'react';
import { useAuth } from '../hooks/useAuth';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  return (
    <section className={styles.section}>
      <h1>Welcome to ai-app SaaS Platform</h1>
      {user ? (
        <p>Hello, <b>{user.name}</b>! Glad to see you back.</p>
      ) : (
        <p>
          Please <a href="/login">log in</a> to access your profile and features.
        </p>
      )}
    </section>
  );
};

export default HomePage;
