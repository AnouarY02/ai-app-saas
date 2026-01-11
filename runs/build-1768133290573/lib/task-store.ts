import { randomUUID } from 'crypto';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

const tasks: Task[] = [];

export function getTasksByUser(userId: string): Task[] {
  return tasks.filter(t => t.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function createTask({ userId, title, description }: { userId: string; title: string; description?: string; }): Task {
  const task: Task = {
    id: randomUUID(),
    userId,
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find(t => t.id === id);
}

export function updateTask(id: string, data: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>): Task | undefined {
  const task = getTaskById(id);
  if (!task) return undefined;
  Object.assign(task, data);
  return task;
}

export function deleteTask(id: string): void {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx !== -1) tasks.splice(idx, 1);
}

