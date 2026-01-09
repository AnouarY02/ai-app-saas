import { Task } from '../../lib/types';

export default function TaskDetail({ task }: { task: Task }) {
  return (
    <div className="bg-white rounded shadow p-6 space-y-2">
      <h3 className="text-xl font-bold">{task.title}</h3>
      {task.description && <p className="text-gray-700">{task.description}</p>}
      <div className="flex gap-4 text-sm text-gray-500">
        <span>Deadline: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Geen'}</span>
        <span>Status: {task.completed ? 'Voltooid' : 'Open'}</span>
      </div>
    </div>
  );
}

