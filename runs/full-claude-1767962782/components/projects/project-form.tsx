import { useState } from 'react';
import { createProject, updateProject } from '../../lib/data/projects';
import { Project } from '../../lib/types';

export default function ProjectForm({ project }: { project?: Project }) {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (project) {
      await updateProject({ ...project, name, description });
    } else {
      await createProject({ name, description });
      setName('');
      setDescription('');
    }
    setLoading(false);
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Projectnaam"
        value={name}
        onChange={e => setName(e.target.value)}
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
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        {project ? 'Opslaan' : 'Toevoegen'}
      </button>
    </form>
  );
}

