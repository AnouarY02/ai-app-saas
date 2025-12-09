'use client';
import { Task } from '../types';

export async function createOrUpdateTask(task: Partial<Task> & { createdBy: string }) {
  const method = task.id ? 'PATCH' : 'POST';
  const url = task.id ? `/api/tasks/${task.id}` : '/api/tasks';
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (res.ok) return { success: true };
  const data = await res.json();
  return { success: false, error: data.error };
}

