import { User, Team, Project, Task } from './types';

// In-memory stores
let users: User[] = [
  {
    id: 'u1',
    name: 'Alice Example',
    email: 'alice@example.com',
    avatarUrl: '',
    teamIds: ['t1'],
  },
];
let teams: Team[] = [
  { id: 't1', name: 'Dev Team', memberIds: ['u1'] },
];
let projects: Project[] = [
  { id: 'p1', name: 'MVP Launch', description: 'Lancering MVP', teamId: 't1' },
];
let tasks: Task[] = [
  {
    id: 'task1',
    title: 'Setup project',
    description: 'Initial Next.js setup',
    projectId: 'p1',
    assigneeId: 'u1',
    status: 'done',
    dueDate: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Simulate current user (MVP, replace with real auth)
export async function getCurrentUser(): Promise<User | undefined> {
  return users[0];
}

export async function getUserById(id: string): Promise<User | undefined> {
  return users.find(u => u.id === id);
}

export async function getUsers(): Promise<User[]> {
  return users;
}

export async function addUser(user: User) {
  users.push(user);
}

export async function getTeams(): Promise<Team[]> {
  return teams;
}

export async function getTeamById(id: string): Promise<Team | undefined> {
  return teams.find(t => t.id === id);
}

export async function addTeam(team: Team) {
  teams.push(team);
}

export async function updateTeam(id: string, data: Partial<Team>) {
  const idx = teams.findIndex(t => t.id === id);
  if (idx !== -1) teams[idx] = { ...teams[idx], ...data };
}

export async function deleteTeam(id: string) {
  teams = teams.filter(t => t.id !== id);
}

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  return projects.find(p => p.id === id);
}

export async function getProjectsByTeamId(teamId: string): Promise<Project[]> {
  return projects.filter(p => p.teamId === teamId);
}

export async function addProject(project: Project) {
  projects.push(project);
}

export async function updateProject(id: string, data: Partial<Project>) {
  const idx = projects.findIndex(p => p.id === id);
  if (idx !== -1) projects[idx] = { ...projects[idx], ...data };
}

export async function deleteProject(id: string) {
  projects = projects.filter(p => p.id !== id);
}

export async function getTasks(): Promise<Task[]> {
  return tasks;
}

export async function getTaskById(id: string): Promise<Task | undefined> {
  return tasks.find(t => t.id === id);
}

export async function getTasksByProjectId(projectId: string): Promise<Task[]> {
  return tasks.filter(t => t.projectId === projectId);
}

export async function addTask(task: Task) {
  tasks.push(task);
}

export async function updateTask(id: string, data: Partial<Task>) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx !== -1) tasks[idx] = { ...tasks[idx], ...data, updatedAt: new Date().toISOString() };
}

export async function deleteTask(id: string) {
  tasks = tasks.filter(t => t.id !== id);
}

