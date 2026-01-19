import { AITask } from "./types";

// In-memory store (singleton)
const tasks: AITask[] = globalThis._tasks || (globalThis._tasks = []);

export async function getTaskById(id: string): Promise<AITask | undefined> {
  return tasks.find((t) => t.id === id);
}

export async function updateTaskStatus(id: string, status: "pending" | "running" | "completed"): Promise<AITask | undefined> {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.status = status;
  }
  return task;
}
