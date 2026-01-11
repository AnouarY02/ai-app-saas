import store from '../../lib/store';

export default function CourtList({ clubId }: { clubId: string }) {
  const courts = store.getCourts(clubId);
  return (
    <div className="space-y-2">
      {courts.length === 0 && <div className="text-gray-500">Geen banen gevonden.</div>}
      {courts.map(court => (
        <div key={court.id} className="bg-white rounded shadow p-4 flex items-center justify-between">
          <div className="font-semibold">{court.name}</div>
        </div>
      ))}
    </div>
  );
}

