import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

interface NavItem {
  label: string;
  path: string;
  iconHint?: string;
}

const mainMenu: NavItem[] = [
  { label: 'Home', path: '/', iconHint: 'home' },
  { label: 'About', path: '/about', iconHint: 'info' },
];

const Navigation: React.FC = () => {
  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        {mainMenu.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
              end={item.path === '/'}
            >
              {item.iconHint === 'home' && <span className="nav-icon">🏠</span>}
              {item.iconHint === 'info' && <span className="nav-icon">ℹ️</span>}
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
