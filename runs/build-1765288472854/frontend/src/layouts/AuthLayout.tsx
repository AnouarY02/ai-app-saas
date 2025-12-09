import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

const AuthLayout: React.FC = () => (
  <div className={styles.authContainer}>
    <div className={styles.authBox}>
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;

