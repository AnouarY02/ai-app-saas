import { notFound } from 'next/navigation';
import { getTaskById } from '../../../../lib/data';
import { TaskForm } from '../../../../components/tasks/task-form';

export default async function TaskDetailPage({ params }: { params: { taskId: string } }) {
  const task = await getTaskById(params.taskId);
  if (!task) return notFound();

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Taak bewerken</h1>
      <TaskForm task={task} />
    </div>
  );
}

