import { useState } from 'react';
import store from '../../lib/store';

export default function BookingForm({ clubId }: { clubId: string }) {
  const courts = store.getCourts(clubId);
  const members = store.getMembers(clubId);
  const [courtId, setCourtId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!courtId || !memberId || !startTime || !endTime) {
      setError('Alle velden zijn verplicht.');
      return;
    }
    store.addBooking({ clubId, courtId, memberId, startTime, endTime });
    setCourtId('');
    setMemberId('');
    setStartTime('');
    setEndTime('');
    setError('');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 flex flex-col gap-4 max-w-md">
      <div className="font-semibold">Nieuwe reservering</div>
      <select
        value={courtId}
        onChange={e => setCourtId(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">Kies een baan</option>
        {courts.map(court => (
          <option key={court.id} value={court.id}>{court.name}</option>
        ))}
      </select>
      <select
        value={memberId}
        onChange={e => setMemberId(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">Kies een lid</option>
        {members.map(member => (
          <option key={member.id} value={member.id}>{member.name}</option>
        ))}
      </select>
      <input
        type="datetime-local"
        value={startTime}
        onChange={e => setStartTime(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="datetime-local"
        value={endTime}
        onChange={e => setEndTime(e.target.value)}
        className="border rounded px-3 py-2"
      />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Toevoegen</button>
    </form>
  );
}

