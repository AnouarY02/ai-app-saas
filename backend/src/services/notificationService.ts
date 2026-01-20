import { v4 as uuidv4 } from 'uuid';

export interface Notification {
  id: string;
  userId: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const notifications: Notification[] = [];

export function listNotificationsByUserId(userId: string): Notification[] {
  return notifications.filter(n => n.userId === userId);
}

export function markNotificationAsRead(notificationId: string, userId: string): Notification | undefined {
  const notification = notifications.find(n => n.id === notificationId && n.userId === userId);
  if (notification) {
    notification.read = true;
  }
  return notification;
}
