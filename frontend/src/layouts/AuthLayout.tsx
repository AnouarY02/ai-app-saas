import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;
