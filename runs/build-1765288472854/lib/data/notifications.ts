import { Notification } from '../types';
import { v4 as uuidv4 } from 'uuid';

let notifications: Notification[] = [];

export async function getNotificationsForUser(userId: string): Promise<Notification[]> {
  return notifications.filter(n => n.userId === userId);
}

export async function createNotification(data: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<Notification> {
  const notification: Notification = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  notifications.push(notification);
  return notification;
}

export async function markNotificationRead(id: string, userId: string): Promise<Notification | undefined> {
  const n = notifications.find(n => n.id === id && n.userId === userId);
  if (!n) return undefined;
  n.read = true;
  return n;
}

