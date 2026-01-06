import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import Header from '../components/Header';

const AuthLayout: React.FC = () => (
  <div className={styles.authWrapper}>
    <Header minimal />
    <main className={styles.authContent}>
      <Outlet />
    </main>
  </div>
);

export default AuthLayout;
