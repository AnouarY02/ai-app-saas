import { useState, useEffect } from 'react';

export function ReservationForm() {
  const [userId, setUserId] = useState('');
  const [courtId, setCourtId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [status, setStatus] = useState('pending');
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [courts, setCourts] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/users').then(res => res.json()).then(setUsers);
    fetch('/api/courts').then(res => res.json()).then(setCourts);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, courtId, startTime, endTime, status }),
    });
    if (res.ok) {
      setUserId('');
      setCourtId('');
      setStartTime('');
      setEndTime('');
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
      <h2 className="text-lg font-semibold">Nieuwe reservering</h2>
      <select
        value={userId}
        onChange={e => setUserId(e.target.value)}
        required
        className="border rounded px-3 py-2"
      >
        <option value="">Selecteer gebruiker</option>
        {users.map(u => (
          <option key={u.id} value={u.id}>{u.name}</option>
        ))}
      </select>
      <select
        value={courtId}
        onChange={e => setCourtId(e.target.value)}
        required
        className="border rounded px-3 py-2"
      >
        <option value="">Selecteer baan</option>
        {courts.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <input
        type="datetime-local"
        value={startTime}
        onChange={e => setStartTime(e.target.value)}
        required
        className="border rounded px-3 py-2"
      />
      <input
        type="datetime-local"
        value={endTime}
        onChange={e => setEndTime(e.target.value)}
        required
        className="border rounded px-3 py-2"
      />
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="pending">In afwachting</option>
        <option value="confirmed">Bevestigd</option>
        <option value="cancelled">Geannuleerd</option>
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

