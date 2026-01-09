import { TeamList } from '../../components/teams/team-list';
import { TeamForm } from '../../components/teams/team-form';
import { getTeams } from '../../lib/data';

export default async function TeamsPage() {
  const teams = await getTeams();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Teams</h1>
        <TeamForm />
      </div>
      <TeamList teams={teams} />
    </div>
  );
}

