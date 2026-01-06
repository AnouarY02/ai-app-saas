import React from 'react';
import { useAuth } from '../state/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-700 mb-4">Welcome, {user?.name || user?.email}!</p>
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Your AI Features</h2>
        <p className="text-gray-600">This is where your AI-powered features and insights will appear.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
