import { notFound } from 'next/navigation';
import { getTeamById, getProjectsByTeamId } from '../../../lib/data';
import { ProjectList } from '../../../components/projects/project-list';
import { TeamForm } from '../../../components/teams/team-form';

export default async function TeamDetailPage({ params }: { params: { teamId: string } }) {
  const team = await getTeamById(params.teamId);
  if (!team) return notFound();
  const projects = await getProjectsByTeamId(team.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{team.name}</h1>
        <TeamForm team={team} />
      </div>
      <section>
        <h2 className="text-xl font-semibold mb-2">Projecten</h2>
        <ProjectList projects={projects} />
      </section>
    </div>
  );
}

