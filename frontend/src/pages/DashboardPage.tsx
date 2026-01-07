import React, { useEffect, useState } from 'react';
import { getDashboardMetrics, DashboardMetrics } from '../utils/apiClient';

const DashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getDashboardMetrics()
      .then(setMetrics)
      .catch((err) => setError(err.message || 'Failed to load metrics'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!metrics) return null;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <span className="text-gray-500">Contacts</span>
          <span className="text-2xl font-bold">{metrics.totalContacts}</span>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <span className="text-gray-500">Deals</span>
          <span className="text-2xl font-bold">{metrics.totalDeals}</span>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <span className="text-gray-500">Total Deal Value</span>
          <span className="text-2xl font-bold">${metrics.totalDealValue.toLocaleString()}</span>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <span className="text-gray-500">Pipeline Stages</span>
          <div className="flex flex-col items-center">
            {Object.entries(metrics.dealsByStage).map(([stage, count]) => (
              <div key={stage} className="text-sm">
                <span className="font-semibold">{stage}:</span> {count}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
