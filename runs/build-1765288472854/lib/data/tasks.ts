import { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';

let tasks: Task[] = [];

export async function getTasks(): Promise<Task[]> {
  return tasks;
}

export async function getTaskById(id: string): Promise<Task | undefined> {
  return tasks.find(t => t.id === id);
}

export async function createTask(data: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
  const task: Task = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

export async function updateTask(id: string, data: Partial<Omit<Task, 'id' | 'createdAt' | 'createdBy'>>): Promise<Task | undefined> {
  const task = tasks.find(t => t.id === id);
  if (!task) return undefined;
  Object.assign(task, data);
  return task;
}

export async function deleteTask(id: string): Promise<boolean> {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

export async function getStatsForUser(userId: string): Promise<{ todo: number; in_progress: number; done: number }> {
  const userTasks = tasks.filter(t => t.assignedTo === userId || t.createdBy === userId);
  return {
    todo: userTasks.filter(t => t.status === 'todo').length,
    in_progress: userTasks.filter(t => t.status === 'in_progress').length,
    done: userTasks.filter(t => t.status === 'done').length,
  };
}

