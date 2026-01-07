import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const AuthLayout: React.FC = () => (
  <div className="auth-layout">
    <main className="auth-content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default AuthLayout;
