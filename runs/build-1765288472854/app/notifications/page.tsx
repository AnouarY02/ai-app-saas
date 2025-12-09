import { getCurrentUser } from '../../lib/auth';
import { NotificationList } from '../../components/notifications/notification-list';
import { redirect } from 'next/navigation';

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) return redirect('/login');
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Notificaties</h1>
      <NotificationList userId={user.id} />
    </div>
  );
}

