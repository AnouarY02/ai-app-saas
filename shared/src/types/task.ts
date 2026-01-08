// Task domain types
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}
