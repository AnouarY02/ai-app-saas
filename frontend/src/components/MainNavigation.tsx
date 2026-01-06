import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon } from './icons/HomeIcon';
import styles from './MainNavigation.module.css';

const MainNavigation: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
        end
      >
        <HomeIcon className={styles.icon} /> Home
      </NavLink>
    </nav>
  );
};

export default MainNavigation;
