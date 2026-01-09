import { useState } from 'react';
import { Task } from '../../lib/types';

export function TaskForm({ projectId, task }: { projectId?: string; task?: Task }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'open');
  const [dueDate, setDueDate] = useState(task?.dueDate ? task.dueDate.slice(0, 10) : '');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/tasks' + (task ? `/${task.id}` : ''), {
      method: task ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        status,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        projectId: projectId || task?.projectId,
      }),
    });
    setLoading(false);
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-end mb-4">
      <input
        type="text"
        className="border rounded px-2 py-1 flex-1"
        placeholder="Taaktitel"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        className="border rounded px-2 py-1 flex-1"
        placeholder="Beschrijving"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <select
        className="border rounded px-2 py-1"
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option value="open">Open</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <input
        type="date"
        className="border rounded px-2 py-1"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {task ? 'Opslaan' : 'Toevoegen'}
      </button>
    </form>
  );
}

