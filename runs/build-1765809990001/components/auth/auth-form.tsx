import { useState } from 'react';

export function AuthForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      window.location.href = '/dashboard';
    } else {
      const data = await res.json();
      setError(data.error || 'Inloggen mislukt');
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 w-80 flex flex-col gap-4">
      <label className="text-sm font-medium">E-mailadres</label>
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border rounded px-3 py-2"
        placeholder="jouw@email.nl"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Bezig...' : 'Inloggen'}
      </button>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  );
}

