import { getCurrentUser } from '../../lib/auth';
import { TaskList } from '../../components/tasks/task-list';
import { TaskForm } from '../../components/tasks/task-form';
import { redirect } from 'next/navigation';

export default async function TasksPage() {
  const user = await getCurrentUser();
  if (!user) return redirect('/login');
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Taken</h1>
        <TaskForm userId={user.id} />
      </div>
      <TaskList />
    </div>
  );
}

