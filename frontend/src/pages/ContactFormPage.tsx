import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getContact, createContact, updateContact } from '../utils/apiClient';

interface ContactFormPageProps {
  mode: 'create' | 'edit';
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
}

const ContactFormPage: React.FC<ContactFormPageProps> = ({ mode }) => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(mode === 'edit');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'edit' && id) {
      setLoading(true);
      getContact(id)
        .then(contact => setForm({ name: contact.name, email: contact.email, phone: contact.phone }))
        .catch(() => setError('Failed to load contact'))
        .finally(() => setLoading(false));
    }
  }, [mode, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (mode === 'create') {
        await createContact(form);
        navigate('/contacts');
      } else if (mode === 'edit' && id) {
        await updateContact(id, form);
        navigate('/contacts');
      }
    } catch {
      setError('Failed to save contact');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">{mode === 'create' ? 'Add Contact' : 'Edit Contact'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            className="w-full border rounded px-3 py-2"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            className="w-full border rounded px-3 py-2"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            name="phone"
            className="w-full border rounded px-3 py-2"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={saving}
          >
            {saving ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'}
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => navigate('/contacts')}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactFormPage;
