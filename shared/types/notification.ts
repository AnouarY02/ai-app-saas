// Notification type
import type { ID } from './common';

export type Notification = {
  id: ID;
  userId: ID;
  type: string;
  message: string;
  read: boolean;
  createdAt: string; // ISO string
};
