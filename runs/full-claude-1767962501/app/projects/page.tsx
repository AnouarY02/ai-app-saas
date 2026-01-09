import { ProjectList } from '../../components/projects/project-list';
import { ProjectForm } from '../../components/projects/project-form';
import { getProjects } from '../../lib/data';

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projecten</h1>
        <ProjectForm />
      </div>
      <ProjectList projects={projects} />
    </div>
  );
}

