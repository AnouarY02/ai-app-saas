import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  status: string;
  dueDate: Date;
  createdAt: Date;
}

const tasks: Task[] = [];

export function listAllTasks(query?: any): Task[] {
  // Optionally filter by query
  return tasks;
}

export function createTask(data: Partial<Task>): Task {
  const task: Task = {
    id: uuidv4(),
    title: data.title || '',
    description: data.description || '',
    assigneeId: data.assigneeId || '',
    status: data.status || 'todo',
    dueDate: data.dueDate ? new Date(data.dueDate) : new Date(),
    createdAt: new Date()
  };
  tasks.push(task);
  return task;
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find(t => t.id === id);
}

export function updateTask(id: string, data: Partial<Task>): Task | undefined {
  const task = getTaskById(id);
  if (!task) return undefined;
  Object.assign(task, data);
  return task;
}

export function deleteTask(id: string): void {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx !== -1) tasks.splice(idx, 1);
}
