import Link from 'next/link';
import { Project } from '../../lib/types';

export function ProjectList({ projects }: { projects: Project[] }) {
  if (!projects.length) return <div className="text-gray-500">Geen projecten gevonden.</div>;
  return (
    <ul className="divide-y bg-white rounded shadow">
      {projects.map(project => (
        <li key={project.id} className="p-4 hover:bg-gray-50">
          <Link href={`/projects/${project.id}`} className="font-semibold text-blue-700 hover:underline">
            {project.name}
          </Link>
          {project.description && <div className="text-gray-500 text-sm">{project.description}</div>}
        </li>
      ))}
    </ul>
  );
}

