import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { getContact, updateContact, deleteContact, Contact, ContactUpdate } from '../utils/apiClient';

const ContactDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getContact(id)
      .then(setContact)
      .catch((err) => setError(err.message || 'Failed to load contact'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: ContactUpdate) => {
    if (!id) return;
    try {
      await updateContact(id, data);
      navigate('/contacts');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update contact');
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('Delete this contact?')) return;
    setDeleting(true);
    try {
      await deleteContact(id);
      navigate('/contacts');
    } catch (err: any) {
      setError(err.message || 'Failed to delete contact');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!contact) return null;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Contact</h2>
      <ContactForm initial={contact} onSubmit={handleSubmit} />
      <button
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? 'Deleting...' : 'Delete Contact'}
      </button>
    </div>
  );
};
export default ContactDetailPage;
