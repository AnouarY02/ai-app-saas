import TeamList from '../../components/teams/team-list';
import TeamForm from '../../components/teams/team-form';

export default function TeamsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Teams</h2>
        <TeamForm />
      </div>
      <TeamList />
    </div>
  );
}

