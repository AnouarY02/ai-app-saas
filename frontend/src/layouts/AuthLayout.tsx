import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

const AuthLayout: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.authBox}>
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;
