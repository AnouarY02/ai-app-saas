import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import styles from './MainNav.module.css';

const menuItems = [
  { label: 'Home', path: '/', icon: '🏠' },
  { label: 'Dashboard', path: '/dashboard', icon: '📊', protected: true },
  { label: 'Account', path: '/account', icon: '👤', protected: true },
];

const MainNav: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>AI App SaaS</div>
      <ul className={styles.menu}>
        {menuItems.map((item) => {
          if (item.protected && !user) return null;
          return (
            <li key={item.path} className={location.pathname === item.path ? styles.active : ''}>
              <Link to={item.path}>
                <span className={styles.icon}>{item.icon}</span> {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={styles.authLinks}>
        {!user ? (
          <>
            <Link to="/login" className={styles.link}>Login</Link>
            <Link to="/register" className={styles.link}>Register</Link>
          </>
        ) : (
          <Link to="/logout" className={styles.link}>Logout</Link>
        )}
      </div>
    </nav>
  );
};

export default MainNav;

