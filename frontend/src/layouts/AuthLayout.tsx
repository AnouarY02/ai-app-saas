import React from 'react';
import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

const AuthLayout: React.FC = () => (
  <div className="auth-layout-root">
    <main className="auth-layout-main">
      <Outlet />
    </main>
  </div>
);

export default AuthLayout;
