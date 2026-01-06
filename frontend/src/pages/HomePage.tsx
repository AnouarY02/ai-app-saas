import React from 'react';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Welcome to AI App</h1>
      <p className={styles.subtitle}>
        This is your starting point for a modern SaaS application. Explore the monorepo structure, shared utilities, and more.
      </p>
    </section>
  );
};

export default HomePage;
