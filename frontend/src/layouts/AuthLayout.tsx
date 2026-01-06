import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
