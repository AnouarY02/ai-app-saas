import { useState } from 'react';
import { Feature } from '../../lib/types';

export default function FeatureForm({ feature }: { feature?: Feature }) {
  const [name, setName] = useState(feature?.name || '');
  const [description, setDescription] = useState(feature?.description || '');
  const [enabled, setEnabled] = useState(feature?.enabled ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(feature ? `/api/features/${feature.id}` : '/api/features', {
        method: feature ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, enabled })
      });
      if (!res.ok) throw new Error('Opslaan mislukt');
      window.location.href = '/features';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Naam</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Beschrijving</label>
        <textarea
          className="input input-bordered w-full min-h-[60px]"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={e => setEnabled(e.target.checked)}
          id="enabled"
        />
        <label htmlFor="enabled">Actief</label>
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Opslaan...' : 'Opslaan'}
      </button>
    </form>
  );
}

