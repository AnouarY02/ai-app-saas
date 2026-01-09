import { db } from './store';
import { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';

export async function getTasks(): Promise<Task[]> {
  return db.tasks;
}

export async function getTasksByProjectId(projectId: string): Promise<Task[]> {
  return db.tasks.filter(t => t.projectId === projectId);
}

export async function createTask({ title, description, dueDate, projectId }: { title: string; description?: string; dueDate?: string; projectId?: string }): Promise<Task> {
  const task: Task = {
    id: uuidv4(),
    title,
    description,
    projectId: projectId || '',
    completed: false,
  };
  if (dueDate) task.dueDate = dueDate;
  db.tasks.push(task);
  return task;
}

export async function updateTask(task: Task): Promise<Task> {
  const idx = db.tasks.findIndex(t => t.id === task.id);
  if (idx !== -1) db.tasks[idx] = task;
  return task;
}

export async function getTaskById(id: string): Promise<Task | undefined> {
  return db.tasks.find(t => t.id === id);
}

