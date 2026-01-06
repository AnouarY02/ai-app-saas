import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiSmile } from 'react-icons/fi';
import './Navigation.css';

const navItems = [
  { label: 'Home', path: '/', icon: <FiHome /> },
  { label: 'Hello', path: '/hello', icon: <FiSmile /> },
];

const Navigation: React.FC = () => {
  return (
    <nav className="main-nav">
      <ul>
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
              end={item.path === '/'}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;