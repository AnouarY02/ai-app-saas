import { db } from './store';
import { Team } from '../types';
import { v4 as uuidv4 } from 'uuid';

export async function getTeams(): Promise<Team[]> {
  return db.teams;
}

export async function createTeam({ name }: { name: string }): Promise<Team> {
  const team: Team = { id: uuidv4(), name, memberIds: [] };
  db.teams.push(team);
  return team;
}

export async function getTeamById(id: string): Promise<Team | undefined> {
  return db.teams.find(t => t.id === id);
}

