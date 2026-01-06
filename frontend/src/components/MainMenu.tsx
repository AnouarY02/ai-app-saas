import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MainMenu.module.css';

const menu = [
  { label: 'Home', path: '/', icon: '🏠' },
  { label: 'Profile', path: '/profile', icon: '👤' },
];

const MainMenu: React.FC = () => (
  <nav className={styles.menu}>
    {menu.map(item => (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          isActive ? styles.active : undefined
        }
        end={item.path === '/'}
      >
        <span className={styles.icon}>{item.icon}</span>
        {item.label}
      </NavLink>
    ))}
  </nav>
);

export default MainMenu;
