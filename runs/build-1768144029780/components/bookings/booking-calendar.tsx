import { getBookingsByClub } from "../../lib/data/booking-store";

export async function BookingCalendar({ clubId }: { clubId: string }) {
  const bookings = await getBookingsByClub(clubId);
  if (!bookings.length) return <div>Geen boekingen gevonden.</div>;
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2">Boekingen</h2>
      <ul className="divide-y">
        {bookings.map(b => (
          <li key={b.id} className="py-2 flex flex-col">
            <span>Baan: {b.courtId}</span>
            <span>Lid: {b.memberId}</span>
            <span>
              {new Date(b.startTime).toLocaleString()} - {new Date(b.endTime).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

