import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DealForm from '../components/DealForm';
import { createDeal, getContacts, Contact, DealCreate } from '../utils/apiClient';

const DealFormPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getContacts()
      .then((res) => setContacts(res.items))
      .catch((err) => setError(err.message || 'Failed to load contacts'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (data: DealCreate) => {
    try {
      await createDeal(data);
      navigate('/deals');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create deal');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">New Deal</h2>
      <DealForm contacts={contacts} onSubmit={handleSubmit} />
    </div>
  );
};
export default DealFormPage;
