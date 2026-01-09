import TaskDetail from '../../../components/tasks/task-detail';
import TaskForm from '../../../components/tasks/task-form';
import { getTaskById } from '../../../lib/data/tasks';
import { notFound } from 'next/navigation';

export default async function TaskDetailPage({ params }: { params: { taskId: string } }) {
  const task = await getTaskById(params.taskId);
  if (!task) return notFound();

  return (
    <div className="space-y-8">
      <TaskDetail task={task} />
      <TaskForm task={task} />
    </div>
  );
}

