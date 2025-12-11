import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

const MainLayout: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <Navigation />
    <main className="flex-1 container mx-auto px-4 py-8">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
