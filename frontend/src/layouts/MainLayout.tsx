import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainMenu from '../components/MainMenu';
import styles from './MainLayout.module.css';

const MainLayout: React.FC = () => (
  <div className={styles.wrapper}>
    <Header />
    <MainMenu />
    <main className={styles.mainContent}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
