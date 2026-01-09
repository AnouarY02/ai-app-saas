import { getTeams } from '../../lib/data/teams';

export default async function TeamList() {
  const teams = await getTeams();
  return (
    <ul className="divide-y bg-white rounded shadow">
      {teams.map(team => (
        <li key={team.id} className="p-4 flex items-center justify-between">
          <span className="font-medium">{team.name}</span>
          <span className="text-xs text-gray-500">{team.memberIds.length} leden</span>
        </li>
      ))}
      {teams.length === 0 && (
        <li className="p-4 text-gray-500">Geen teams gevonden.</li>
      )}
    </ul>
  );
}

