import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from '../types/task';

const tasks: Task[] = [];

export const taskService = {
  async listTasks(userId: string): Promise<Task[]> {
    return tasks.filter(t => t.userId === userId);
  },
  async createTask(userId: string, data: { title: string; description?: string; dueDate?: string }): Promise<Task> {
    const now = new Date();
    const task: Task = {
      id: uuidv4(),
      userId,
      title: data.title,
      description: data.description || '',
      status: 'pending',
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      createdAt: now,
      updatedAt: now
    };
    tasks.push(task);
    return task;
  },
  async getTask(userId: string, taskId: string): Promise<Task | null> {
    const task = tasks.find(t => t.id === taskId && t.userId === userId);
    return task || null;
  },
  async updateTask(userId: string, taskId: string, updates: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>): Promise<Task | null> {
    const task = tasks.find(t => t.id === taskId && t.userId === userId);
    if (!task) return null;
    if (updates.title !== undefined) task.title = updates.title;
    if (updates.description !== undefined) task.description = updates.description;
    if (updates.status !== undefined && ['pending', 'in_progress', 'completed'].includes(updates.status)) {
      task.status = updates.status as TaskStatus;
    }
    if (updates.dueDate !== undefined) {
      task.dueDate = updates.dueDate ? new Date(updates.dueDate) : undefined;
    }
    task.updatedAt = new Date();
    return task;
  },
  async deleteTask(userId: string, taskId: string): Promise<boolean> {
    const idx = tasks.findIndex(t => t.id === taskId && t.userId === userId);
    if (idx === -1) return false;
    tasks.splice(idx, 1);
    return true;
  }
};
