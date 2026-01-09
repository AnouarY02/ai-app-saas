import ProjectList from '../components/projects/project-list';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Projecten</h2>
      <ProjectList />
    </div>
  );
}

