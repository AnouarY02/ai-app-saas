import { useState } from 'react';
import { createTeam } from '../../lib/data/teams';

export default function TeamForm() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await createTeam({ name });
    setName('');
    setLoading(false);
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Teamnaam"
        value={name}
        onChange={e => setName(e.target.value)}
        className="input input-bordered"
        required
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        Toevoegen
      </button>
    </form>
  );
}

