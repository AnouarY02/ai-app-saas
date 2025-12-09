import { redirect } from 'next/navigation';
import { getCurrentUser } from '../lib/auth';
import { DashboardStats } from '../components/dashboard/dashboard-stats';
import { TaskList } from '../components/tasks/task-list';
import { NotificationList } from '../components/notifications/notification-list';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return redirect('/login');
  return (
    <div className="space-y-8">
      <DashboardStats userId={user.id} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-lg font-semibold mb-2">Mijn taken</h2>
          <TaskList userId={user.id} limit={5} />
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Notificaties</h2>
          <NotificationList userId={user.id} limit={5} />
        </section>
      </div>
    </div>
  );
}

