import { useEffect, useState } from 'react';

interface Reservation {
  id: string;
  userId: string;
  courtId: string;
  startTime: string;
  endTime: string;
  status: string;
}

export function ReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reservations')
      .then(res => res.json())
      .then(setReservations)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Laden...</div>;

  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="p-2 text-left">Gebruiker</th>
          <th className="p-2 text-left">Baan</th>
          <th className="p-2 text-left">Starttijd</th>
          <th className="p-2 text-left">Eindtijd</th>
          <th className="p-2 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map(res => (
          <tr key={res.id} className="border-t">
            <td className="p-2">{res.userId}</td>
            <td className="p-2">{res.courtId}</td>
            <td className="p-2">{new Date(res.startTime).toLocaleString()}</td>
            <td className="p-2">{new Date(res.endTime).toLocaleString()}</td>
            <td className="p-2">{res.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

