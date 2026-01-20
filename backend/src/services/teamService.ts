import { v4 as uuidv4 } from 'uuid';

export interface Team {
  id: string;
  name: string;
  members: string[];
}

const teams: Team[] = [];

export function listAllTeams(): Team[] {
  return teams;
}

export function createTeam(data: Partial<Team>): Team {
  const team: Team = {
    id: uuidv4(),
    name: data.name || '',
    members: data.members || []
  };
  teams.push(team);
  return team;
}

export function getTeamById(id: string): Team | undefined {
  return teams.find(t => t.id === id);
}

export function updateTeam(id: string, data: Partial<Team>): Team | undefined {
  const team = getTeamById(id);
  if (!team) return undefined;
  Object.assign(team, data);
  return team;
}

export function deleteTeam(id: string): void {
  const idx = teams.findIndex(t => t.id === id);
  if (idx !== -1) teams.splice(idx, 1);
}
