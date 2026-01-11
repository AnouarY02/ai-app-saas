import store from '../../lib/store';

export default function BookingList({ clubId }: { clubId: string }) {
  const bookings = store.getBookings(clubId);
  const courts = store.getCourts(clubId);
  const members = store.getMembers(clubId);

  function getCourtName(id: string) {
    return courts.find(c => c.id === id)?.name || 'Onbekend';
  }
  function getMemberName(id: string) {
    return members.find(m => m.id === id)?.name || 'Onbekend';
  }

  return (
    <div className="space-y-2">
      {bookings.length === 0 && <div className="text-gray-500">Geen reserveringen gevonden.</div>}
      {bookings.map(booking => (
        <div key={booking.id} className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <div className="font-semibold">{getCourtName(booking.courtId)}</div>
            <div className="text-gray-500 text-sm">{getMemberName(booking.memberId)}</div>
          </div>
          <div className="text-gray-700 text-sm">
            {new Date(booking.startTime).toLocaleString()} &ndash; {new Date(booking.endTime).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

