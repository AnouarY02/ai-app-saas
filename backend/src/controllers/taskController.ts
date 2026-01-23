import { Request, Response, NextFunction } from 'express';
import * as taskService from '../services/taskService';
import { createTaskRequestSchema, updateTaskRequestSchema, queryParamsSchema, pathParamsSchema } from '../types/validators';

export async function listTasks(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const query = queryParamsSchema.parse(req.query);
    const tasks = await taskService.listTasks(userId, query);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function createTask(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const data = createTaskRequestSchema.parse(req.body);
    const task = await taskService.createTask(userId, data);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

export async function getTask(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const { id } = pathParamsSchema.parse(req.params);
    const task = await taskService.getTask(userId, id);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const { id } = pathParamsSchema.parse(req.params);
    const data = updateTaskRequestSchema.parse(req.body);
    const task = await taskService.updateTask(userId, id, data);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const { id } = pathParamsSchema.parse(req.params);
    await taskService.deleteTask(userId, id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
}
