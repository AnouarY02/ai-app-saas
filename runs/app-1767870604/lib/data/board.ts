import store from './store';
import { Board } from '../types';

export function getBoardsByOwner(ownerId: string): Board[] {
  return store.boards.filter(b => b.ownerId === ownerId);
}

export function getBoardById(id: string): Board | undefined {
  return store.boards.find(b => b.id === id);
}

export function createBoard(board: Board): void {
  store.boards.push(board);
}

