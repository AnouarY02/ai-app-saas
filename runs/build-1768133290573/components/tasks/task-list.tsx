import { useEffect, useState } from 'react';
import { TaskItem } from './task-item';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export function TaskList({ userId }: { userId: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTasks() {
    setLoading(true);
    const res = await fetch('/api/tasks');
    if (res.ok) {
      setTasks(await res.json());
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  function handleTaskUpdated() {
    fetchTasks();
  }

  if (loading) return <div>Laden...</div>;
  if (!tasks.length) return <div className="text-gray-500">Geen taken gevonden.</div>;

  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onChange={handleTaskUpdated} />
      ))}
    </ul>
  );
}

