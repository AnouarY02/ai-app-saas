// Task and Notification Status constants
type TaskStatusType = 'todo' | 'in-progress' | 'done';
export const TASK_STATUSES = ['todo', 'in-progress', 'done'] as const;
export type TaskStatus = typeof TASK_STATUSES[number];

export type NotificationStatus = 'unread' | 'read';
export const NOTIFICATION_STATUSES = ['unread', 'read'] as const;
