import { Task } from '../../lib/types';

interface TaskDetailProps {
  task: Task;
}

export function TaskDetail({ task }: TaskDetailProps) {
  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-2">{task.title}</h2>
      <div className="mb-2 text-muted-foreground">Status: {task.status}</div>
      {task.dueDate && <div className="mb-2 text-muted-foreground">Deadline: {new Date(task.dueDate).toLocaleDateString()}</div>}
      {task.description && <div className="mb-2">{task.description}</div>}
      <div className="text-xs text-muted-foreground">Aangemaakt op: {new Date(task.createdAt).toLocaleString()}</div>
    </div>
  );
}

