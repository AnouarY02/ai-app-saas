import Link from 'next/link';
import { getProjects } from '../../lib/data/projects';

export default async function ProjectList() {
  const projects = await getProjects();
  return (
    <ul className="divide-y bg-white rounded shadow">
      {projects.map(project => (
        <li key={project.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
          <Link href={`/projects/${project.id}`} className="font-medium text-blue-700 hover:underline">
            {project.name}
          </Link>
          <span className="text-xs text-gray-500">{project.description}</span>
        </li>
      ))}
      {projects.length === 0 && (
        <li className="p-4 text-gray-500">Geen projecten gevonden.</li>
      )}
    </ul>
  );
}

