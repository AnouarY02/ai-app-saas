import TaskList from '../../../components/tasks/task-list';
import ProjectForm from '../../../components/projects/project-form';
import { getProjectById } from '../../../lib/data/projects';
import { notFound } from 'next/navigation';

export default async function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const project = await getProjectById(params.projectId);
  if (!project) return notFound();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{project.name}</h2>
        <ProjectForm project={project} />
      </div>
      <TaskList projectId={project.id} />
    </div>
  );
}

