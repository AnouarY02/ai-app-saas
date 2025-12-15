import { useState } from 'react';

export function CourtForm() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch('/api/courts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, location, active }),
    });
    if (res.ok) {
      setName('');
      setLocation('');
      setActive(true);
      window.location.reload();
    } else {
      const data = await res.json();
      setError(data.error || 'Fout bij opslaan');
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 flex flex-col gap-4 max-w-md">
      <h2 className="text-lg font-semibold">Nieuwe padelbaan toevoegen</h2>
      <input
        type="text"
        placeholder="Naam"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="border rounded px-3 py-2"
      />
      <input
        type="text"
        placeholder="Locatie"
        value={location}
        onChange={e => setLocation(e.target.value)}
        required
        className="border rounded px-3 py-2"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={active}
          onChange={e => setActive(e.target.checked)}
        />
        Beschikbaar
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Toevoegen...' : 'Toevoegen'}
      </button>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  );
}

