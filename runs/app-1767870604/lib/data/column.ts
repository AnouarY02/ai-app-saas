import store from './store';
import { Column } from '../types';

export function getColumnsByBoard(boardId: string): Column[] {
  return store.columns.filter(c => c.boardId === boardId);
}

export function getColumnById(id: string): Column | undefined {
  return store.columns.find(c => c.id === id);
}

export function createColumn(column: Column): void {
  store.columns.push(column);
}

