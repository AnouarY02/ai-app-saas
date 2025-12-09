import Link from 'next/link';
import { getTasks } from '../../lib/data/tasks';
import { Task } from '../../lib/types';

interface TaskListProps {
  userId?: string;
  limit?: number;
}

export async function TaskList({ userId, limit }: TaskListProps) {
  let tasks = await getTasks();
  if (userId) tasks = tasks.filter(t => t.assignedTo === userId || t.createdBy === userId);
  if (limit) tasks = tasks.slice(0, limit);
  return (
    <ul className="divide-y">
      {tasks.map(task => (
        <li key={task.id} className="py-3 flex items-center justify-between">
          <div>
            <Link href={`/tasks/${task.id}`} className="font-medium text-primary hover:underline">{task.title}</Link>
            <span className="ml-2 text-xs text-muted-foreground">{task.status}</span>
          </div>
          {task.dueDate && (
            <span className="text-xs text-muted-foreground">Deadline: {new Date(task.dueDate).toLocaleDateString()}</span>
          )}
        </li>
      ))}
      {tasks.length === 0 && <li className="py-3 text-muted-foreground">Geen taken gevonden.</li>}
    </ul>
  );
}

