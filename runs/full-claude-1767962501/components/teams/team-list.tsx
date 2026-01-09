import Link from 'next/link';
import { Team } from '../../lib/types';

export function TeamList({ teams }: { teams: Team[] }) {
  if (!teams.length) return <div className="text-gray-500">Geen teams gevonden.</div>;
  return (
    <ul className="divide-y bg-white rounded shadow">
      {teams.map(team => (
        <li key={team.id} className="p-4 hover:bg-gray-50">
          <Link href={`/teams/${team.id}`} className="font-semibold text-blue-700 hover:underline">
            {team.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

