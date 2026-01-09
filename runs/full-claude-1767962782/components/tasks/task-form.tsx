import { useState } from 'react';
import { createTask, updateTask } from '../../lib/data/tasks';
import { Task } from '../../lib/types';

export default function TaskForm({ task }: { task?: Task }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate ? task.dueDate.substring(0, 10) : '');
  const [completed, setCompleted] = useState(task?.completed || false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (task) {
      await updateTask({ ...task, title, description, dueDate: dueDate ? new Date(dueDate).toISOString() : undefined, completed });
    } else {
      await createTask({ title, description, dueDate: dueDate ? new Date(dueDate).toISOString() : undefined });
      setTitle('');
      setDescription('');
      setDueDate('');
      setCompleted(false);
    }
    setLoading(false);
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-4">
      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="input input-bordered"
        required
      />
      <input
        type="text"
        placeholder="Beschrijving"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="input input-bordered"
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        className="input input-bordered"
      />
      {task && (
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={completed}
            onChange={e => setCompleted(e.target.checked)}
          />
          Voltooid
        </label>
      )}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        {task ? 'Opslaan' : 'Toevoegen'}
      </button>
    </form>
  );
}

