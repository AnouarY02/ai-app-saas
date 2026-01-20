import { v4 as uuidv4 } from 'uuid';

export interface Activity {
  id: string;
  projectId: string;
  actorId: string;
  type: string;
  payload: object;
  createdAt: Date;
}

const activities: Activity[] = [];

export function listActivityByProjectId(projectId: string): Activity[] {
  return activities.filter(a => a.projectId === projectId);
}
