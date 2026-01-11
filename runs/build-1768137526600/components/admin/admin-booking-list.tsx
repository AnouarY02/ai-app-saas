"use client";
import { useEffect, useState } from 'react';

interface Booking {
  id: string;
  userId: string;
  courtId: string;
  startTime: string;
  endTime: string;
}

export default function AdminBookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(setBookings);
  }, []);

  return (
    <table className="w-full border text-sm">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Gebruiker</th>
          <th className="p-2">Baan</th>
          <th className="p-2">Van</th>
          <th className="p-2">Tot</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map(b => (
          <tr key={b.id} className="border-t">
            <td className="p-2">{b.userId}</td>
            <td className="p-2">{b.courtId}</td>
            <td className="p-2">{new Date(b.startTime).toLocaleString()}</td>
            <td className="p-2">{new Date(b.endTime).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

