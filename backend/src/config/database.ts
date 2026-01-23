// In-memory DB for demo; replace with real DB in production
import { User } from '../models/User';
import { Task } from '../models/Task';

export const usersDb: User[] = [];
export const tasksDb: Task[] = [];
