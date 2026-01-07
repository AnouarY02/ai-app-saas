import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNav.css';

const navLinks = [
  { label: 'Home', path: '/', icon: '🏠' },
  { label: 'Hello World', path: '/hello', icon: '😊' },
];

const MainNav: React.FC = () => {
  return (
    <nav className="main-nav">
      <ul>
        {navLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
              end={link.path === '/'}
            >
              <span className="icon" aria-hidden="true">{link.icon}</span>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNav;
