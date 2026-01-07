import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDeals, deleteDeal } from '../utils/apiClient';

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  createdAt: string;
  updatedAt: string;
}

const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchDeals = () => {
    setLoading(true);
    getDeals()
      .then(data => setDeals(data.deals))
      .catch(() => setError('Failed to load deals'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this deal?')) return;
    setDeletingId(id);
    try {
      await deleteDeal(id);
      setDeals(deals => deals.filter(d => d.id !== id));
    } catch {
      setError('Failed to delete deal');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Deals</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate('/deals/new')}
        >
          + Add Deal
        </button>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Value</th>
              <th className="py-2 px-4 text-left">Stage</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map(deal => (
              <tr key={deal.id} className="border-b last:border-b-0">
                <td className="py-2 px-4">{deal.title}</td>
                <td className="py-2 px-4">${deal.value.toLocaleString()}</td>
                <td className="py-2 px-4">{deal.stage}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/deals/${deal.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(deal.id)}
                    disabled={deletingId === deal.id}
                  >
                    {deletingId === deal.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
            {deals.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">No deals found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealsPage;
