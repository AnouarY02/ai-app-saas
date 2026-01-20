import { v4 as uuidv4 } from "uuid";

// Simpele in-memory store (singleton)
const tasks: any[] = globalThis._tasks || (globalThis._tasks = []);

export async function getTasksByUser(userId: string) {
  return tasks.filter((t) => t.userId === userId);
}

export async function getTaskById(id: string) {
  return tasks.find((t) => t.id === id) || null;
}

export async function createTask({ userId, title, description }: { userId: string; title: string; description?: string }) {
  const task = {
    id: uuidv4(),
    userId,
    title,
    description,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

export async function deleteTaskById(id: string) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}
