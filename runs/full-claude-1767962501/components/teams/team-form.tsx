import { useState } from 'react';
import { Team } from '../../lib/types';

export function TeamForm({ team }: { team?: Team }) {
  const [name, setName] = useState(team?.name || '');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/teams' + (team ? `/${team.id}` : ''), {
      method: team ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setLoading(false);
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        className="border rounded px-2 py-1"
        placeholder="Teamnaam"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {team ? 'Opslaan' : 'Toevoegen'}
      </button>
    </form>
  );
}

