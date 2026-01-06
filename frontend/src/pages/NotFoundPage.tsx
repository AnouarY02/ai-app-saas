import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => (
  <div className={styles.container}>
    <h2 className={styles.title}>404 - Page Not Found</h2>
    <p className={styles.text}>Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className={styles.homeLink}>
      Go to Home
    </Link>
  </div>
);

export default NotFoundPage;
