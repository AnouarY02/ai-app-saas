import Link from 'next/link';
import store from '../../lib/store';

export default function ClubList() {
  const clubs = store.getClubs();
  return (
    <div className="space-y-4">
      {clubs.length === 0 && <div className="text-gray-500">Geen clubs gevonden.</div>}
      {clubs.map(club => (
        <div key={club.id} className="bg-white rounded shadow p-4 flex items-center justify-between">
          <div>
            <div className="font-semibold">{club.name}</div>
            {club.address && <div className="text-gray-500 text-sm">{club.address}</div>}
          </div>
          <Link href={`/clubs/${club.id}/dashboard`} className="text-blue-600 hover:underline">Dashboard</Link>
        </div>
      ))}
    </div>
  );
}

