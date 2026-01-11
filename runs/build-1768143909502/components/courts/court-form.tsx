import { useState } from 'react';
import store from '../../lib/store';

export default function CourtForm({ clubId }: { clubId: string }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name) {
      setError('Naam is verplicht.');
      return;
    }
    store.addCourt({ clubId, name });
    setName('');
    setError('');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 flex flex-col gap-4 max-w-md">
      <div className="font-semibold">Nieuwe baan toevoegen</div>
      <input
        type="text"
        placeholder="Naam/nummer baan"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border rounded px-3 py-2"
      />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Toevoegen</button>
    </form>
  );
}

