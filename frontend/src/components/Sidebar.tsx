import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const menu = [
  { label: 'Dashboard', path: '/', icon: '🏠' },
  { label: 'Contacts', path: '/contacts', icon: '👥' },
  { label: 'Deals', path: '/deals', icon: '💼' },
];

const Sidebar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return null;
  return (
    <aside className="w-56 bg-white border-r hidden md:flex flex-col min-h-screen">
      <div className="h-16 flex items-center justify-center font-bold text-xl border-b">SaaS CRM</div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menu.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-50'
                  }`
                }
                end={item.path === '/'}
              >
                <span className="mr-2 text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
