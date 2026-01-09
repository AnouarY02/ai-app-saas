import ProjectList from '../../components/projects/project-list';
import ProjectForm from '../../components/projects/project-form';

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projecten</h2>
        <ProjectForm />
      </div>
      <ProjectList />
    </div>
  );
}

