// Task type
import type { ID } from './common';
import { TaskStatus } from '../constants/statuses';

export type Task = {
  id: ID;
  title: string;
  description: string;
  assigneeId: ID;
  status: TaskStatus;
  dueDate: string; // ISO string
  createdAt: string; // ISO string
};
