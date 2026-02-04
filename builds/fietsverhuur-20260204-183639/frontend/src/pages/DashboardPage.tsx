import React, { useEffect, useState } from 'react';
import { apiClient } from '@/utils/apiClient';

const DashboardPage = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await apiClient.getInsights();
        setInsights(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {insights.map(insight => (
          <li key={insight.id}>{insight.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;