import { getStatsForUser } from '../../lib/data/tasks';

interface DashboardStatsProps {
  userId: string;
}

export async function DashboardStats({ userId }: DashboardStatsProps) {
  const stats = await getStatsForUser(userId);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded shadow p-4">
        <div className="text-sm text-muted-foreground">Open taken</div>
        <div className="text-2xl font-bold">{stats.todo}</div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <div className="text-sm text-muted-foreground">In uitvoering</div>
        <div className="text-2xl font-bold">{stats.in_progress}</div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <div className="text-sm text-muted-foreground">Afgerond</div>
        <div className="text-2xl font-bold">{stats.done}</div>
      </div>
    </div>
  );
}

