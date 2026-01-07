import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import './Header.css';

const navMenu = [
  { label: 'Home', path: '/', icon: '🏠' },
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
];

const Header: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">AI SaaS</Link>
      </div>
      <nav className="header-nav">
        {navMenu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path ? 'nav-link active' : 'nav-link'
            }
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-user">
        {isAuthenticated ? (
          <>
            <span className="user-email">{user?.email}</span>
            <Link to="/logout" className="nav-link logout-link">
              Logout
            </Link>
          </>
        ) : (
          <Link to="/login" className="nav-link login-link">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
