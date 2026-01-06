import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps {
  minimal?: boolean;
}

const Header: React.FC<HeaderProps> = ({ minimal }) => (
  <header className={styles.header}>
    <div className={styles.logo}><Link to="/">ai-app</Link></div>
    {!minimal && (
      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    )}
  </header>
);

export default Header;
