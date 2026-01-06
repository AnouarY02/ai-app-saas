import React from 'react';
import './Footer.css';

const Footer: React.FC = () => (
  <footer className="footer-root">
    <div>© {new Date().getFullYear()} AI App. All rights reserved.</div>
  </footer>
);

export default Footer;
