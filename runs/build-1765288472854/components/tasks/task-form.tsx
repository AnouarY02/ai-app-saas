'use client';
import { useState } from 'react';
import { Task } from '../../lib/types';
import { createOrUpdateTask } from '../../lib/client/task-actions';

interface TaskFormProps {
  userId: string;
  task?: Task;
}

export function TaskForm({ userId, task }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<Task['status']>(task?.status || 'todo');
  const [dueDate, setDueDate] = useState(task?.dueDate ? task.dueDate.slice(0, 10) : '');
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo || '');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await createOrUpdateTask({
      id: task?.id,
      title,
      description,
      status,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      assignedTo: assignedTo || null,
      createdBy: userId,
    });
    if (!res.success) setError(res.error || 'Fout bij opslaan');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-white rounded shadow p-4">
      <input
        type="text"
        placeholder="Titel"
        className="input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Omschrijving"
        className="input"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <select className="input" value={status} onChange={e => setStatus(e.target.value as Task['status'])}>
        <option value="todo">Te doen</option>
        <option value="in_progress">In uitvoering</option>
        <option value="done">Afgerond</option>
      </select>
      <input
        type="date"
        className="input"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Toegewezen aan (userId)"
        className="input"
        value={assignedTo || ''}
        onChange={e => setAssignedTo(e.target.value)}
      />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button type="submit" className="btn btn-primary mt-2">{task ? 'Bijwerken' : 'Aanmaken'}</button>
    </form>
  );
}

