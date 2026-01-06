import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <span>&copy; {new Date().getFullYear()} ai-app SaaS Platform</span>
  </footer>
);

export default Footer;
