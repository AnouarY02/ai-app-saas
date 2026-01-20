import { v4 as uuidv4 } from 'uuid';

export interface Column {
  id: string;
  name: string;
  taskIds: string[];
}

export interface Board {
  id: string;
  projectId: string;
  name: string;
  columns: Column[];
}

const boards: Board[] = [];

export function listBoardsByProjectId(projectId: string): Board[] {
  return boards.filter(b => b.projectId === projectId);
}

export function createBoardForProject(projectId: string, data: Partial<Board>): Board {
  const board: Board = {
    id: uuidv4(),
    projectId,
    name: data.name || '',
    columns: data.columns || []
  };
  boards.push(board);
  return board;
}

export function getBoardById(id: string): Board | undefined {
  return boards.find(b => b.id === id);
}

export function updateBoard(id: string, data: Partial<Board>): Board | undefined {
  const board = getBoardById(id);
  if (!board) return undefined;
  Object.assign(board, data);
  return board;
}

export function deleteBoard(id: string): void {
  const idx = boards.findIndex(b => b.id === id);
  if (idx !== -1) boards.splice(idx, 1);
}
