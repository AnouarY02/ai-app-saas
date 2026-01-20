import { Request, Response } from 'express';
import { listAllTasks, createTask, getTaskById, updateTask, deleteTask } from '../services/taskService';

export async function listTasks(req: Request, res: Response) {
  try {
    res.json(listAllTasks(req.query));
  } catch (err) {
    res.status(500).json({ error: 'Failed to list tasks' });
  }
}

export async function createTask(req: Request, res: Response) {
  try {
    const task = createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
}

export async function getTask(req: Request, res: Response) {
  try {
    const { taskId } = req.params;
    const task = getTaskById(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get task' });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const { taskId } = req.params;
    const task = updateTask(taskId, req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const { taskId } = req.params;
    deleteTask(taskId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}
