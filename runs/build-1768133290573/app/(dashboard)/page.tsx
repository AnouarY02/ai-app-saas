import { TaskList } from '../../components/tasks/task-list';
import { TaskForm } from '../../components/tasks/task-form';
import { getSessionUser } from '../../lib/auth';

export default async function DashboardPage() {
  const user = await getSessionUser();
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Mijn Taken</h2>
      <TaskForm userId={user!.id} />
      <div className="mt-8">
        <TaskList userId={user!.id} />
      </div>
    </section>
  );
}

