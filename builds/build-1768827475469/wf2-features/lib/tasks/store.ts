import { AITask } from "./types";

// In-memory store
const tasks: AITask[] = [];

export function getTasksByUserId(userId: string): AITask[] {
  return tasks.filter((t) => t.userId === userId);
}

export function addTask(task: AITask) {
  tasks.push(task);
}

export function getTaskById(id: string): AITask | undefined {
  return tasks.find((t) => t.id === id);
}

export function updateTask(id: string, updates: Partial<AITask>) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx !== -1) {
    tasks[idx] = { ...tasks[idx], ...updates };
  }
}

export function deleteTask(id: string) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx !== -1) {
    tasks.splice(idx, 1);
  }
}
