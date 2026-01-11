import { useState, FormEvent } from 'react';

export function TaskForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    setLoading(false);
    if (res.ok) {
      setTitle('');
      setDescription('');
      // Optionally: trigger parent update via event or context
      window.dispatchEvent(new Event('task-created'));
    } else {
      const data = await res.json();
      setError(data.error || 'Er is iets misgegaan');
    }
  }

  // Listen for task-created event to refresh task list
  // (TaskList can listen to this event if needed)

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow-sm p-4 space-y-3">
      <div>
        <label className="block mb-1 font-medium">Titel</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Beschrijving <span className="text-gray-400">(optioneel)</span></label>
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 font-semibold"
      >
        {loading ? 'Toevoegen...' : 'Taak toevoegen'}
      </button>
    </form>
  );
}

