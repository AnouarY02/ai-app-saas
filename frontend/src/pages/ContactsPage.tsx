import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getContacts, deleteContact } from '../utils/apiClient';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchContacts = () => {
    setLoading(true);
    getContacts()
      .then(data => setContacts(data.contacts))
      .catch(() => setError('Failed to load contacts'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this contact?')) return;
    setDeletingId(id);
    try {
      await deleteContact(id);
      setContacts(contacts => contacts.filter(c => c.id !== id));
    } catch {
      setError('Failed to delete contact');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate('/contacts/new')}
        >
          + Add Contact
        </button>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id} className="border-b last:border-b-0">
                <td className="py-2 px-4">{contact.name}</td>
                <td className="py-2 px-4">{contact.email}</td>
                <td className="py-2 px-4">{contact.phone}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/contacts/${contact.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(contact.id)}
                    disabled={deletingId === contact.id}
                  >
                    {deletingId === contact.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">No contacts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsPage;
