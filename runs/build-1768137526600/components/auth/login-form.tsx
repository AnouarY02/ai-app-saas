"use client";
import { useState } from 'react';
import { useAuth } from '../../lib/auth-context';

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({ email, name });
    } catch (err: any) {
      setError(err.message || 'Login mislukt');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
      <div>
        <label className="block mb-1">Naam</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">E-mail</label>
        <input
          type="email"
          className="w-full border rounded px-2 py-1"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Bezig...' : 'Login / Registreren'}
      </button>
    </form>
  );
}

