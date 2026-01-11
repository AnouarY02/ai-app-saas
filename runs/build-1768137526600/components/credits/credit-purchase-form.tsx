"use client";
import { useState } from 'react';
import { useAuth } from '../../lib/auth-context';

export default function CreditPurchaseForm() {
  const { user, refreshUser } = useAuth();
  const [amount, setAmount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handlePurchase(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id, amount }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Fout bij kopen credits');
      }
      setSuccess(true);
      refreshUser();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handlePurchase} className="flex items-end gap-2">
      <div>
        <label className="block mb-1">Aantal credits</label>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="border rounded px-2 py-1 w-24"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Bezig...' : 'Kopen'}
      </button>
      {success && <span className="text-green-600 ml-2">Succes!</span>}
      {error && <span className="text-red-600 ml-2">{error}</span>}
    </form>
  );
}

