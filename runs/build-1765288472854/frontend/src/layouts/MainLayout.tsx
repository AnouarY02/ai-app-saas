import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNav from '../components/MainNav';
import styles from './MainLayout.module.css';

const MainLayout: React.FC = () => (
  <div className={styles.container}>
    <MainNav />
    <main className={styles.mainContent}>
      <Outlet />
    </main>
  </div>
);

export default MainLayout;

