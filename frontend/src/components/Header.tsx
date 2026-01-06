import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import './Header.css';

const navItems = [
  { label: 'Home', path: '/', icon: '🏠' },
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { label: 'Settings', path: '/settings', icon: '⚙️' }
];

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  return (
    <header className="header-root">
      <div className="header-logo">
        <Link to="/">AI App</Link>
      </div>
      <nav className="header-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path ? 'nav-link active' : 'nav-link'
            }
          >
            <span className="nav-icon">{item.icon}</span> {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        {user ? (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
