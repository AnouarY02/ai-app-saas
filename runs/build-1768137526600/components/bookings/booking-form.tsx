"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth-context';

interface Court {
  id: string;
  name: string;
}

export default function BookingForm() {
  const { user, refreshUser } = useAuth();
  const [courts, setCourts] = useState<Court[]>([]);
  const [courtId, setCourtId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/courts')
      .then(res => res.json())
      .then(setCourts);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          courtId,
          startTime,
          endTime,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Fout bij boeken');
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
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label>Baan</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={courtId}
          onChange={e => setCourtId(e.target.value)}
          required
        >
          <option value="">Selecteer baan</option>
          {courts.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Starttijd</label>
        <input
          type="datetime-local"
          className="w-full border rounded px-2 py-1"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Eindtijd</label>
        <input
          type="datetime-local"
          className="w-full border rounded px-2 py-1"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Bezig...' : 'Boek'}
      </button>
      {success && <span className="text-green-600 ml-2">Succes!</span>}
    </form>
  );
}

