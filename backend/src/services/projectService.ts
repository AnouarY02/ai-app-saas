import { v4 as uuidv4 } from 'uuid';

export interface Project {
  id: string;
  name: string;
  description: string;
  teamId: string;
  createdAt: Date;
}

const projects: Project[] = [];

export function listAllProjects(): Project[] {
  return projects;
}

export function createProject(data: Partial<Project>): Project {
  const project: Project = {
    id: uuidv4(),
    name: data.name || '',
    description: data.description || '',
    teamId: data.teamId || '',
    createdAt: new Date()
  };
  projects.push(project);
  return project;
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function updateProject(id: string, data: Partial<Project>): Project | undefined {
  const project = getProjectById(id);
  if (!project) return undefined;
  Object.assign(project, data);
  return project;
}

export function deleteProject(id: string): void {
  const idx = projects.findIndex(p => p.id === id);
  if (idx !== -1) projects.splice(idx, 1);
}
