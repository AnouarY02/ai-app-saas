import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDeals, deleteDeal, Deal } from '../utils/apiClient';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchDeals = () => {
    setLoading(true);
    getDeals()
      .then((res) => setDeals(res.items))
      .catch((err) => setError(err.message || 'Failed to load deals'))
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
      setDeals((prev) => prev.filter((d) => d.id !== id));
    } catch (err: any) {
      setError(err.message || 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Deals</h1>
        <Link to="/deals/new" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
          <FiPlus /> New Deal
        </Link>
      </div>
      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Value</th>
                <th className="px-4 py-2 text-left">Stage</th>
                <th className="px-4 py-2 text-left">Contact</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="px-4 py-2">{d.title}</td>
                  <td className="px-4 py-2">${d.value.toLocaleString()}</td>
                  <td className="px-4 py-2">{d.stage}</td>
                  <td className="px-4 py-2">{d.contactId}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <button
                      className="text-blue-600 hover:underline flex items-center gap-1"
                      onClick={() => navigate(`/deals/${d.id}`)}
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-red-600 hover:underline flex items-center gap-1"
                      onClick={() => handleDelete(d.id)}
                      disabled={deletingId === d.id}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
              {deals.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">No deals found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default DealsPage;
