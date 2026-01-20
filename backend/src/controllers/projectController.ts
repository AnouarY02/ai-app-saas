import { Request, Response } from 'express';
import { listAllProjects, createProject, getProjectById, updateProject, deleteProject } from '../services/projectService';

export async function listProjects(req: Request, res: Response) {
  try {
    res.json(listAllProjects());
  } catch (err) {
    res.status(500).json({ error: 'Failed to list projects' });
  }
}

export async function createProject(req: Request, res: Response) {
  try {
    const project = createProject(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project' });
  }
}

export async function getProject(req: Request, res: Response) {
  try {
    const { projectId } = req.params;
    const project = getProjectById(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get project' });
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const { projectId } = req.params;
    const project = updateProject(projectId, req.body);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const { projectId } = req.params;
    deleteProject(projectId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
}
