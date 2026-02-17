import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <Link to="/" className="text-2xl font-bold text-brand-primary-600">AI App</Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
