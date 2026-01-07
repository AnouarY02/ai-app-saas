import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon } from './icons/HomeIcon';

const navItems = [
  { label: 'Home', path: '/', icon: <HomeIcon className="w-5 h-5 mr-2" /> },
];

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded hover:bg-gray-100 transition-colors font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-700'
                }`
              }
              end
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
