import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="home-root">
      <h1>Welcome to AI App</h1>
      <p>Your gateway to powerful AI features as a service.</p>
      {user ? (
        <Link to="/dashboard" className="primary-btn">Go to Dashboard</Link>
      ) : (
        <Link to="/login" className="primary-btn">Login to Get Started</Link>
      )}
    </div>
  );
};

export default HomePage;
