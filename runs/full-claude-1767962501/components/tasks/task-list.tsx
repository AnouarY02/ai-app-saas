import { Task } from '../../lib/types';
import { TaskCard } from './task-card';
import { TaskForm } from './task-form';

export function TaskList({ tasks, projectId }: { tasks: Task[]; projectId?: string }) {
  return (
    <div className="space-y-4">
      {projectId && <TaskForm projectId={projectId} />}
      {tasks.length === 0 ? (
        <div className="text-gray-500">Geen taken gevonden.</div>
      ) : (
        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id}>
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

