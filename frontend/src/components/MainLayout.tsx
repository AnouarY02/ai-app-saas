import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiGrid, FiUsers, FiTrendingUp, FiLogOut } from 'react-icons/fi';
import { useAppSelector } from '../redux/hooks';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <FiGrid /> },
  { label: 'Contacts', path: '/contacts', icon: <FiUsers /> },
  { label: 'Deals', path: '/deals', icon: <FiTrendingUp /> },
];

const MainLayout: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="h-16 flex items-center justify-center border-b">
          <span className="font-bold text-xl">SaaS CRM</span>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-50 transition font-medium ${location.pathname.startsWith(item.path) ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t p-4 flex items-center gap-3">
          <div className="flex-1">
            <div className="font-semibold text-gray-800 text-sm truncate">{user?.email}</div>
          </div>
          <Link to="/logout" className="text-gray-500 hover:text-red-600" title="Logout">
            <FiLogOut size={20} />
          </Link>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
export default MainLayout;
