import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDeal, createDeal, updateDeal } from '../utils/apiClient';

interface DealFormPageProps {
  mode: 'create' | 'edit';
}

interface DealForm {
  title: string;
  value: number;
  stage: string;
}

const DealFormPage: React.FC<DealFormPageProps> = ({ mode }) => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<DealForm>({ title: '', value: 0, stage: '' });
  const [loading, setLoading] = useState(mode === 'edit');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'edit' && id) {
      setLoading(true);
      getDeal(id)
        .then(deal => setForm({ title: deal.title, value: deal.value, stage: deal.stage }))
        .catch(() => setError('Failed to load deal'))
        .finally(() => setLoading(false));
    }
  }, [mode, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'value' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (mode === 'create') {
        await createDeal(form);
        navigate('/deals');
      } else if (mode === 'edit' && id) {
        await updateDeal(id, form);
        navigate('/deals');
      }
    } catch {
      setError('Failed to save deal');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">{mode === 'create' ? 'Add Deal' : 'Edit Deal'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            className="w-full border rounded px-3 py-2"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Value</label>
          <input
            name="value"
            type="number"
            className="w-full border rounded px-3 py-2"
            value={form.value}
            onChange={handleChange}
            min={0}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stage</label>
          <select
            name="stage"
            className="w-full border rounded px-3 py-2"
            value={form.stage}
            onChange={handleChange}
            required
          >
            <option value="">Select stage</option>
            <option value="Prospecting">Prospecting</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Closed Won">Closed Won</option>
            <option value="Closed Lost">Closed Lost</option>
          </select>
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
            onClick={() => navigate('/deals')}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DealFormPage;
