import React from 'react';
import { Outlet } from 'react-router-dom';
import { mainMenu } from '@/navigation';

export const DashboardLayout = () => (
  <div className="dashboard-layout">
    <nav>
      {mainMenu.map(item => (
        <a key={item.path} href={item.path}>{item.label}</a>
      ))}
    </nav>
    <Outlet />
  </div>
);