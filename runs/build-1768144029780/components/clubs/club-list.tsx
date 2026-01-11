import Link from "next/link";
import { getClubs } from "../../lib/data/club-store";

export async function ClubList() {
  const clubs = await getClubs();
  if (!clubs.length) return <div>Geen clubs gevonden.</div>;
  return (
    <ul className="divide-y bg-white rounded shadow">
      {clubs.map(club => (
        <li key={club.id} className="p-4 flex items-center justify-between">
          <div>
            <div className="font-semibold">{club.name}</div>
            {club.address && <div className="text-gray-500 text-sm">{club.address}</div>}
          </div>
          <Link href={`/clubs/${club.id}`} className="text-blue-600 hover:underline">Dashboard</Link>
        </li>
      ))}
    </ul>
  );
}

