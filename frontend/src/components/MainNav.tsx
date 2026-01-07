import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import styles from './MainNav.module.css';

const navItems = [
  { label: 'Home', path: '/', icon: '🏠' },
  { label: 'AI App', path: '/app', icon: '🤖' },
  { label: 'Settings', path: '/settings', icon: '⚙️' }
];

const MainNav: React.FC = () => {
  const { user } = useAuth();
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>AI SaaS</div>
      <ul className={styles.menu}>
        {navItems.map(item => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              end={item.path === '/'}
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={styles.userSection}>
        {user ? (
          <>
            <span className={styles.userName}>{user.name}</span>
            <NavLink to="/logout" className={styles.logout}>
              Logout
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" className={styles.login}>
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
