import React, { useEffect, useState } from 'react';
import { getDashboardSummary } from '../utils/apiClient';

interface DashboardSummary {
  totalContacts: number;
  totalDeals: number;
  totalDealValue: number;
  dealsByStage: Record<string, number>;
}

const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getDashboardSummary()
      .then(setSummary)
      .catch(() => setError('Failed to load dashboard data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!summary) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Contacts</div>
          <div className="text-2xl font-bold">{summary.totalContacts}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Deals</div>
          <div className="text-2xl font-bold">{summary.totalDeals}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Total Deal Value</div>
          <div className="text-2xl font-bold">${summary.totalDealValue.toLocaleString()}</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Deals By Stage</h2>
        <ul>
          {Object.entries(summary.dealsByStage).map(([stage, count]) => (
            <li key={stage} className="flex justify-between border-b last:border-b-0 py-1">
              <span>{stage}</span>
              <span>{count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
