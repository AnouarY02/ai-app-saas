"use client";
import { useState } from 'react';

export default function AdminCourtForm() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/courts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Fout bij toevoegen baan');
      }
      setSuccess(true);
      setName('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        placeholder="Naam baan"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border rounded px-2 py-1"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Toevoegen...' : 'Toevoegen'}
      </button>
      {success && <span className="text-green-600 ml-2">Toegevoegd!</span>}
      {error && <span className="text-red-600 ml-2">{error}</span>}
    </form>
  );
}

