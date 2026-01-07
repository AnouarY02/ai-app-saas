import React, { useEffect, useState } from 'react';
import { DashboardResponse } from 'shared/src/types';
import { apiClient } from 'shared/src/utils/apiClient';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    apiClient
      .get<DashboardResponse>('/api/dashboard')
      .then((res) => {
        if (isMounted) {
          setData(res.data);
          setError(null);
        }
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message || err.message || 'Failed to load dashboard.'
        );
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div className="dashboard-loading">Loading dashboard...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;
  if (!data) return null;

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="dashboard-user">
        <strong>User:</strong> {data.user.email}
      </div>
      <div className="dashboard-features">
        <h2>Features</h2>
        <ul>
          {data.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
