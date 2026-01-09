import { notFound } from 'next/navigation';
import { getProjectById, getTasksByProjectId } from '../../../lib/data';
import { TaskList } from '../../../components/tasks/task-list';
import { ProjectForm } from '../../../components/projects/project-form';

export default async function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const project = await getProjectById(params.projectId);
  if (!project) return notFound();
  const tasks = await getTasksByProjectId(project.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <ProjectForm project={project} />
      </div>
      <section>
        <h2 className="text-xl font-semibold mb-2">Taken</h2>
        <TaskList tasks={tasks} projectId={project.id} />
      </section>
    </div>
  );
}

