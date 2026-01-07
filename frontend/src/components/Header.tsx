import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/', icon: '🏠' },
  { label: 'App', path: '/app', icon: '📊' },
];

const headerStyle: React.CSSProperties = {
  width: '100%',
  background: '#fff',
  borderBottom: '1px solid #e5e7eb',
  padding: '0 16px',
  display: 'flex',
  alignItems: 'center',
  height: 56,
  boxSizing: 'border-box',
  zIndex: 10,
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: 24,
  marginLeft: 24,
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#222',
  fontWeight: 500,
  fontSize: 16,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '6px 10px',
  borderRadius: 4,
  transition: 'background 0.2s',
};

const activeLinkStyle: React.CSSProperties = {
  ...linkStyle,
  background: '#e5e7eb',
};

const logoStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 20,
  color: '#2a2a2a',
  letterSpacing: 1,
};

const Header: React.FC = () => {
  const location = useLocation();
  return (
    <header style={headerStyle}>
      <span style={logoStyle}>ai-app</span>
      <nav style={navStyle}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={location.pathname === item.path ? activeLinkStyle : linkStyle}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
