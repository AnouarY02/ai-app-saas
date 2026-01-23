// Project-wide shared constants
import type { TaskStatus } from './types/task';

export const TASK_STATUSES: TaskStatus[] = ['todo', 'in_progress', 'done'];

export const PASSWORD_MIN_LENGTH = 8;
export const NAME_MAX_LENGTH = 50;
export const TASK_TITLE_MAX_LENGTH = 100;
export const TASK_DESCRIPTION_MAX_LENGTH = 1000;
