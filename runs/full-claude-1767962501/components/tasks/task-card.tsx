import Link from 'next/link';
import { Task } from '../../lib/types';
import { UserAvatar } from '../user-avatar';
import { getUserById } from '../../lib/data';

export async function TaskCard({ task }: { task: Task }) {
  const assignee = task.assigneeId ? await getUserById(task.assigneeId) : null;
  return (
    <Link href={`/projects/${task.projectId}/tasks/${task.id}`} className="block bg-white rounded shadow p-4 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-lg">{task.title}</div>
        <span className={
          'text-xs px-2 py-1 rounded ' +
          (task.status === 'done'
            ? 'bg-green-100 text-green-700'
            : task.status === 'in progress'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-gray-100 text-gray-700')
        }>
          {task.status}
        </span>
      </div>
      {task.description && <div className="text-gray-600 mt-1">{task.description}</div>}
      <div className="flex items-center gap-2 mt-2">
        {assignee && <UserAvatar user={assignee} size={24} />}
        {assignee && <span className="text-sm text-gray-500">{assignee.name}</span>}
        {task.dueDate && (
          <span className="ml-auto text-xs text-gray-400">Deadline: {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
      </div>
    </Link>
  );
}

