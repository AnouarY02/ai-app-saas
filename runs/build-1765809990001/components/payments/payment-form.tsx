import { useState, useEffect } from 'react';

export function PaymentForm() {
  const [reservationId, setReservationId] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('pending');
  const [reservations, setReservations] = useState<{ id: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/reservations').then(res => res.json()).then(setReservations);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reservationId, amount: parseFloat(amount), status }),
    });
    if (res.ok) {
      setReservationId('');
      setAmount('');
      setStatus('pending');
      window.location.reload();
    } else {
      const data = await res.json();
      setError(data.error || 'Fout bij opslaan');
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 flex flex-col gap-4 max-w-md">
      <h2 className="text-lg font-semibold">Nieuwe betaling</h2>
      <select
        value={reservationId}
        onChange={e => setReservationId(e.target.value)}
        required
        className="border rounded px-3 py-2"
      >
        <option value="">Selecteer reservering</option>
        {reservations.map(r => (
          <option key={r.id} value={r.id}>{r.id}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Bedrag (€)"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
        min="0"
        step="0.01"
        className="border rounded px-3 py-2"
      />
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="pending">In afwachting</option>
        <option value="paid">Betaald</option>
        <option value="failed">Mislukt</option>
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

