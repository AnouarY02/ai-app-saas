import { Task } from './task-list';
import { useState } from 'react';

interface TaskItemProps {
  task: Task;
  onChange: () => void;
}

export function TaskItem({ task, onChange }: TaskItemProps) {
  const [loading, setLoading] = useState(false);

  async function toggleCompleted() {
    setLoading(true);
    await fetch(`/api/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    });
    setLoading(false);
    onChange();
  }

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
    setLoading(false);
    onChange();
  }

  return (
    <li className="flex items-center justify-between bg-white rounded shadow-sm px-4 py-2">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleCompleted}
          disabled={loading}
          className="accent-primary"
        />
        <div>
          <div className={task.completed ? 'line-through text-gray-400' : ''}>{task.title}</div>
          {task.description && (
            <div className="text-xs text-gray-500">{task.description}</div>
          )}
        </div>
      </div>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-red-500 hover:underline text-sm"
      >
        Verwijder
      </button>
    </li>
  );
}

