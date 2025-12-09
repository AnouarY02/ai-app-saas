import { getNotificationsForUser } from '../../lib/data/notifications';

interface NotificationListProps {
  userId: string;
  limit?: number;
}

export async function NotificationList({ userId, limit }: NotificationListProps) {
  let notifications = await getNotificationsForUser(userId);
  if (limit) notifications = notifications.slice(0, limit);
  return (
    <ul className="divide-y">
      {notifications.map(n => (
        <li key={n.id} className={`py-3 ${n.read ? 'text-muted-foreground' : ''}`}>{n.message}</li>
      ))}
      {notifications.length === 0 && <li className="py-3 text-muted-foreground">Geen notificaties.</li>}
    </ul>
  );
}

