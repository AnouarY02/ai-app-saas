import { useEffect, useState } from 'react';
import { useUserSession } from '../../lib/session-context';

export type Reservation = {
  id: string;
  courtId: string;
  startTime: string;
  endTime: string;
  status: string;
};

export function ReservationList() {
  const { user } = useUserSession();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  useEffect(() => {
    if (!user) return;
    fetch(`/api/reservations?userId=${user.id}`)
      .then(res => res.json())
      .then(setReservations);
  }, [user]);
  return (
    <ul className="divide-y divide-gray-200 bg-white rounded shadow">
      {reservations.map(r => (
        <li key={r.id} className="p-4">
          <div>Baan: {r.courtId}</div>
          <div className="text-sm text-gray-600">{new Date(r.startTime).toLocaleString()} - {new Date(r.endTime).toLocaleString()}</div>
          <div className="text-xs text-gray-500">Status: {r.status}</div>
        </li>
      ))}
      {reservations.length === 0 && <li className="p-4 text-gray-500">Geen reserveringen gevonden.</li>}
    </ul>
  );
}

