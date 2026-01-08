import store from './store';
import { Task } from '../types';

export function getTasksByColumn(columnId: string): Task[] {
  return store.tasks.filter(t => t.columnId === columnId);
}

export function getTaskById(id: string): Task | undefined {
  return store.tasks.find(t => t.id === id);
}

export function createTask(task: Task): void {
  store.tasks.push(task);
}

