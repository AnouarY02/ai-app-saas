import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => (
  <div className={styles.notFound}>
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <Link to="/" className={styles.homeLink}>Go Home</Link>
  </div>
);

export default NotFoundPage;

