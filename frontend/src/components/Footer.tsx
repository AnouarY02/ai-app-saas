import React from 'react';
import './Footer.css';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-content">
      <span>© {new Date().getFullYear()} AI SaaS App. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;
