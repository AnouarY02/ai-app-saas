import { useState } from 'react';
import { Project } from '../../lib/types';

export function ProjectForm({ project }: { project?: Project }) {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/projects' + (project ? `/${project.id}` : ''), {
      method: project ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    setLoading(false);
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        className="border rounded px-2 py-1"
        placeholder="Projectnaam"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="text"
        className="border rounded px-2 py-1"
        placeholder="Beschrijving"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {project ? 'Opslaan' : 'Toevoegen'}
      </button>
    </form>
  );
}

