import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DealForm from '../components/DealForm';
import { getDeal, updateDeal, deleteDeal, getContacts, Deal, DealUpdate, Contact } from '../utils/apiClient';

const DealDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([getDeal(id), getContacts()])
      .then(([deal, contactsRes]) => {
        setDeal(deal);
        setContacts(contactsRes.items);
      })
      .catch((err) => setError(err.message || 'Failed to load deal'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: DealUpdate) => {
    if (!id) return;
    try {
      await updateDeal(id, data);
      navigate('/deals');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update deal');
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('Delete this deal?')) return;
    setDeleting(true);
    try {
      await deleteDeal(id);
      navigate('/deals');
    } catch (err: any) {
      setError(err.message || 'Failed to delete deal');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!deal) return null;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Deal</h2>
      <DealForm initial={deal} contacts={contacts} onSubmit={handleSubmit} />
      <button
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? 'Deleting...' : 'Delete Deal'}
      </button>
    </div>
  );
};
export default DealDetailPage;
