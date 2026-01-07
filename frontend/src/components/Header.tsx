import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white border-b">
      <div className="font-semibold text-lg">CRM Dashboard</div>
      <div className="flex items-center space-x-4">
        {user && (
          <span className="text-gray-600">{user.email}</span>
        )}
        <button
          onClick={logout}
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
