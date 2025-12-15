import { useState } from 'react';

export function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role }),
    });
    if (res.ok) {
      setName('');
      setEmail('');
      setRole('member');
      window.location.reload();
    } else {
      const data = await res.json();
      setError(data.error || 'Fout bij opslaan');
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 flex flex-col gap-4 max-w-md">
      <h2 className="text-lg font-semibold">Nieuwe gebruiker toevoegen</h2>
      <input
        type="text"
        placeholder="Naam"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="border rounded px-3 py-2"
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="border rounded px-3 py-2"
      />
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>
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

