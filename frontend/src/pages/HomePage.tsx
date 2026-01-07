import React from 'react';
import { useAuth } from '../state/AuthContext';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Welcome to AI SaaS App</h1>
      <p>This is your entry point to powerful AI features.</p>
      {user ? (
        <Link to="/app">Go to AI App</Link>
      ) : (
        <>
          <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default HomePage;
