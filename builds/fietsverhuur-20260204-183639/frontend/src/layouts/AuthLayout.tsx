import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => (
  <div className="auth-layout">
    <div className="auth-card">
      <Outlet />
    </div>
  </div>
);