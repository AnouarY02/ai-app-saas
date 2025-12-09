import { getCurrentUser } from '../../../lib/auth';
import { TaskDetail } from '../../../components/tasks/task-detail';
import { TaskForm } from '../../../components/tasks/task-form';
import { getTaskById } from '../../../lib/data/tasks';
import { notFound, redirect } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function TaskDetailPage({ params }: Props) {
  const user = await getCurrentUser();
  if (!user) return redirect('/login');
  const task = await getTaskById(params.id);
  if (!task) return notFound();
  return (
    <div className="space-y-8">
      <TaskDetail task={task} />
      <TaskForm userId={user.id} task={task} />
    </div>
  );
}

