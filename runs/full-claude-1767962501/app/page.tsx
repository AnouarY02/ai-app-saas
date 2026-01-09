import { ProjectList } from '../components/projects/project-list';
import { TaskList } from '../components/tasks/task-list';
import { getProjects, getTasks } from '../lib/data';

export default async function DashboardPage() {
  const projects = await getProjects();
  const tasks = await getTasks();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <section>
        <h2 className="text-xl font-semibold mb-2">Mijn Projecten</h2>
        <ProjectList projects={projects} />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Recente Taken</h2>
        <TaskList tasks={tasks.slice(0, 5)} />
      </section>
    </div>
  );
}

