import { db } from './store';
import { Project } from '../types';
import { v4 as uuidv4 } from 'uuid';

export async function getProjects(): Promise<Project[]> {
  return db.projects;
}

export async function createProject({ name, description }: { name: string; description?: string }): Promise<Project> {
  const project: Project = { id: uuidv4(), name, description, teamId: undefined };
  db.projects.push(project);
  return project;
}

export async function updateProject(project: Project): Promise<Project> {
  const idx = db.projects.findIndex(p => p.id === project.id);
  if (idx !== -1) db.projects[idx] = project;
  return project;
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  return db.projects.find(p => p.id === id);
}

