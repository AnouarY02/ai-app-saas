import Link from 'next/link';
import { getTasksByProjectId } from '../../lib/data/tasks';

export default async function TaskList({ projectId }: { projectId: string }) {
  const tasks = await getTasksByProjectId(projectId);
  return (
    <ul className="divide-y bg-white rounded shadow">
      {tasks.map(task => (
        <li key={task.id} className="p-4 flex items-center justify-between">
          <Link href={`/tasks/${task.id}`} className="font-medium text-blue-700 hover:underline">
            {task.title}
          </Link>
          <span className={`text-xs ${task.completed ? 'text-green-600' : 'text-gray-500'}`}>{task.completed ? 'Voltooid' : 'Open'}</span>
        </li>
      ))}
      {tasks.length === 0 && (
        <li className="p-4 text-gray-500">Geen taken gevonden.</li>
      )}
    </ul>
  );
}

