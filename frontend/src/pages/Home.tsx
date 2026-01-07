import React from 'react';
import './Home.css';

const Home: React.FC = () => (
  <div className="home-page">
    <h1>Welcome to AI SaaS</h1>
    <p>
      Unlock the power of AI for your business. Sign up or log in to access your personalized dashboard and features.
    </p>
    <ul className="home-features">
      <li>🔒 Secure authentication</li>
      <li>📊 Personalized dashboard</li>
      <li>⚡ Fast, scalable AI services</li>
    </ul>
  </div>
);

export default Home;
