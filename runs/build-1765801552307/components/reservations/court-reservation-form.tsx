import { useEffect, useState } from 'react';
import { useUserSession } from '../../lib/session-context';

export function CourtReservationForm() {
  const { user } = useUserSession();
  const [courts, setCourts] = useState<{ id: string; name: string }[]>([]);
  const [courtId, setCourtId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/courts')
      .then(res => res.json())
      .then(data => setCourts(data));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, courtId, startTime, endTime })
    });
    if (res.ok) {
      setMessage('Reservering aangemaakt!');
      setCourtId('');
      setStartTime('');
      setEndTime('');
    } else {
      const data = await res.json();
      setMessage(data.error || 'Fout bij reserveren');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <div>
        <label className="block mb-1">Baan</label>
        <select value={courtId} onChange={e => setCourtId(e.target.value)} required className="w-full border rounded px-2 py-1">
          <option value="">Selecteer een baan</option>
          {courts.map(court => (
            <option key={court.id} value={court.id}>{court.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">Starttijd</label>
        <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} required className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block mb-1">Eindtijd</label>
        <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} required className="w-full border rounded px-2 py-1" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Reserveer</button>
      {message && <div className="text-sm mt-2">{message}</div>}
    </form>
  );
}

