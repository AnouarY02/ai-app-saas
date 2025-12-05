"use client";
import { useState, useEffect } from 'react';

export function AccountForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setName(data.name || '');
        setEmail(data.email || '');
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Fout bij bijwerken');
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('Netwerkfout');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Naam</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1">E-mail</label>
        <input
          type="email"
          className="input input-bordered w-full"
          value={email}
          disabled
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">Profiel bijgewerkt!</div>}
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? 'Bijwerken...' : 'Opslaan'}
      </button>
    </form>
  );
}

