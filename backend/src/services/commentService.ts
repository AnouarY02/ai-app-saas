import { v4 as uuidv4 } from 'uuid';

export interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: Date;
}

const comments: Comment[] = [];

export function listCommentsByTaskId(taskId: string): Comment[] {
  return comments.filter(c => c.taskId === taskId);
}

export function createCommentForTask(taskId: string, data: Partial<Comment>): Comment {
  const comment: Comment = {
    id: uuidv4(),
    taskId,
    authorId: data.authorId || '',
    content: data.content || '',
    createdAt: new Date()
  };
  comments.push(comment);
  return comment;
}
