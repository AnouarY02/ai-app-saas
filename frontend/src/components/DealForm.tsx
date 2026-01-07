import React, { useState } from 'react';
import { Deal, DealCreate, DealUpdate, Contact } from '../utils/apiClient';

interface Props {
  initial?: Deal;
  contacts: Contact[];
  onSubmit: (data: DealCreate | DealUpdate) => Promise<void>;
}

const stages = [
  'Prospecting',
  'Qualified',
  'Proposal',
  'Negotiation',
  'Closed Won',
  'Closed Lost',
];

const DealForm: React.FC<Props> = ({ initial, contacts, onSubmit }) => {
  const [title, setTitle] = useState(initial?.title || '');
  const [value, setValue] = useState(initial?.value?.toString() || '');
  const [stage, setStage] = useState(initial?.stage || stages[0]);
  const [contactId, setContactId] = useState(initial?.contactId || (contacts[0]?.id || ''));
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        title,
        value: Number(value),
        stage,
        contactId,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Value</label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
          min="0"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Stage</label>
        <select
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          value={stage}
          onChange={e => setStage(e.target.value)}
          required
        >
          {stages.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Contact</label>
        <select
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          value={contactId}
          onChange={e => setContactId(e.target.value)}
          required
        >
          {contacts.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        disabled={submitting}
      >
        {submitting ? 'Saving...' : initial ? 'Update Deal' : 'Create Deal'}
      </button>
    </form>
  );
};
export default DealForm;
