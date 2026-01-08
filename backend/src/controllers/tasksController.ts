import { Request, Response, NextFunction } from 'express';
import { taskService } from '../services/taskService';
import { logError } from '../utils/logger';

export async function listTasks(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const tasks = await taskService.listTasks(userId);
    res.json({ tasks });
  } catch (err) {
    logError('List tasks error', err);
    next(err);
  }
}

export async function createTask(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { title, description, dueDate } = req.body;
    const task = await taskService.createTask(userId, { title, description, dueDate });
    res.status(201).json(task);
  } catch (err) {
    logError('Create task error', err);
    next(err);
  }
}

export async function getTask(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { taskId } = req.params;
    const task = await taskService.getTask(userId, taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    logError('Get task error', err);
    next(err);
  }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { taskId } = req.params;
    const updates = req.body;
    const updated = await taskService.updateTask(userId, taskId, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updated);
  } catch (err) {
    logError('Update task error', err);
    next(err);
  }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { taskId } = req.params;
    const success = await taskService.deleteTask(userId, taskId);
    if (!success) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ success: true });
  } catch (err) {
    logError('Delete task error', err);
    next(err);
  }
}
