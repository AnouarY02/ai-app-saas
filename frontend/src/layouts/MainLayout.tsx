import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNav from '../components/MainNav';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <MainNav />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
