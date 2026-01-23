import { Task, TaskStatus } from '../models/Task';
import { CreateTaskRequest, UpdateTaskRequest, QueryParams } from '../types/api';
import { tasksDb } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export async function listTasks(userId: string, query: QueryParams): Promise<Task[]> {
  let tasks = tasksDb.filter(t => t.userId === userId);
  if (query.status) {
    tasks = tasks.filter(t => t.status === query.status);
  }
  if (query.dueDate) {
    const dueDate = new Date(query.dueDate);
    tasks = tasks.filter(t => t.dueDate && new Date(t.dueDate).toDateString() === dueDate.toDateString());
  }
  return tasks;
}

export async function createTask(userId: string, data: CreateTaskRequest): Promise<Task> {
  const now = new Date();
  const task: Task = {
    id: uuidv4(),
    userId,
    title: data.title,
    description: data.description,
    status: 'todo',
    dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    createdAt: now,
    updatedAt: now
  };
  tasksDb.push(task);
  return task;
}

export async function getTask(userId: string, id: string): Promise<Task> {
  const task = tasksDb.find(t => t.id === id && t.userId === userId);
  if (!task) throw { status: 404, message: 'Task not found' };
  return task;
}

export async function updateTask(userId: string, id: string, data: UpdateTaskRequest): Promise<Task> {
  const task = tasksDb.find(t => t.id === id && t.userId === userId);
  if (!task) throw { status: 404, message: 'Task not found' };
  if (data.title !== undefined) task.title = data.title;
  if (data.description !== undefined) task.description = data.description;
  if (data.status !== undefined) task.status = data.status as TaskStatus;
  if (data.dueDate !== undefined) task.dueDate = data.dueDate ? new Date(data.dueDate) : undefined;
  task.updatedAt = new Date();
  return task;
}

export async function deleteTask(userId: string, id: string): Promise<void> {
  const idx = tasksDb.findIndex(t => t.id === id && t.userId === userId);
  if (idx === -1) throw { status: 404, message: 'Task not found' };
  tasksDb.splice(idx, 1);
}
