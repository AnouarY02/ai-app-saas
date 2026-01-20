// Comment type
import type { ID } from './common';

export type Comment = {
  id: ID;
  taskId: ID;
  authorId: ID;
  content: string;
  createdAt: string; // ISO string
};
