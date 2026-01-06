import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to AI App</h1>
      <p className="mb-6 text-lg text-gray-700">Your modern SaaS platform for AI-powered productivity.</p>
      {user ? (
        <Link to="/dashboard" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors">Go to Dashboard</Link>
      ) : (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors">Login</Link>
          <Link to="/register" className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition-colors">Register</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
