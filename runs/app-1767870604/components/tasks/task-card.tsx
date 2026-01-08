import { Task } from '../../lib/types';

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="bg-white rounded shadow px-4 py-3">
      <div className="font-medium">{task.title}</div>
      {task.description && <div className="text-gray-500 text-sm mt-1">{task.description}</div>}
    </div>
  );
}

