import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-neutral-800 text-white p-4">
        <div className="text-xl font-bold mb-8 text-brand-primary-300">AI App</div>
        <nav className="space-y-2">
          <Link to="/dashboard" className="block px-3 py-2 rounded hover:bg-neutral-700">Dashboard</Link>
          <Link to="/dashboard/users" className="block px-3 py-2 rounded hover:bg-neutral-700">Users</Link>
          <Link to="/dashboard/insights" className="block px-3 py-2 rounded hover:bg-neutral-700">Insights</Link>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-neutral-700">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-neutral-600">{user?.name || user?.email}</span>
            <button onClick={handleLogout} className="text-neutral-500 hover:text-neutral-700">Logout</button>
          </div>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
