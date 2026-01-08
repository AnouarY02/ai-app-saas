import { User, Board, Column, Task } from '../types';

class InMemoryStore {
  users: User[] = [];
  boards: Board[] = [];
  columns: Column[] = [];
  tasks: Task[] = [];
}

// Singleton instance
const store = globalThis._taskManagerStore || (globalThis._taskManagerStore = new InMemoryStore());
export default store;

