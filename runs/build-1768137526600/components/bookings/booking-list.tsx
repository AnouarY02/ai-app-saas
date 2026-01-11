"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../lib/auth-context';

interface Booking {
  id: string;
  courtId: string;
  startTime: string;
  endTime: string;
}

export default function BookingList() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/bookings?userId=${user.id}`)
      .then(res => res.json())
      .then(setBookings);
  }, [user]);

  if (!user) return null;

  return (
    <ul className="divide-y">
      {bookings.length === 0 && <li className="py-2 text-gray-500">Geen boekingen</li>}
      {bookings.map(b => (
        <li key={b.id} className="py-2">
          <span className="font-semibold">Baan:</span> {b.courtId} <span className="ml-2 font-semibold">Van:</span> {new Date(b.startTime).toLocaleString()} <span className="ml-2 font-semibold">Tot:</span> {new Date(b.endTime).toLocaleString()}
        </li>
      ))}
    </ul>
  );
}

