import { Request, Response } from 'express';
import { listAllTeams, createTeam, getTeamById, updateTeam, deleteTeam } from '../services/teamService';

export async function listTeams(req: Request, res: Response) {
  try {
    res.json(listAllTeams());
  } catch (err) {
    res.status(500).json({ error: 'Failed to list teams' });
  }
}

export async function createTeam(req: Request, res: Response) {
  try {
    const team = createTeam(req.body);
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create team' });
  }
}

export async function getTeam(req: Request, res: Response) {
  try {
    const { teamId } = req.params;
    const team = getTeamById(teamId);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get team' });
  }
}

export async function updateTeam(req: Request, res: Response) {
  try {
    const { teamId } = req.params;
    const team = updateTeam(teamId, req.body);
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update team' });
  }
}

export async function deleteTeam(req: Request, res: Response) {
  try {
    const { teamId } = req.params;
    deleteTeam(teamId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
}
