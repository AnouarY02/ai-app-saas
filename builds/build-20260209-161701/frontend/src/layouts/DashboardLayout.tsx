import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white">
        {/* Sidebar content */}
      </aside>
      <main className="flex-1">
        <header className="bg-white shadow">
          {/* Navbar content */}
        </header>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
