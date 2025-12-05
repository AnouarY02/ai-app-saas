import { User, Session, Prompt } from './types';

function createUserStore() {
  let users: User[] = [];
  return {
    findByEmail(email: string) {
      return users.find(u => u.email === email);
    },
    findById(id: string) {
      return users.find(u => u.id === id);
    },
    create(user: User) {
      users.push(user);
      return user;
    },
    update(id: string, data: Partial<User>) {
      const user = users.find(u => u.id === id);
      if (!user) return null;
      Object.assign(user, data);
      return user;
    },
    all() {
      return users;
    },
  };
}

function createSessionStore() {
  let sessions: Session[] = [];
  return {
    find(sessionId: string) {
      return sessions.find(s => s.sessionId === sessionId && s.expiresAt > new Date());
    },
    create(session: Session) {
      sessions.push(session);
      return session;
    },
    delete(sessionId: string) {
      const idx = sessions.findIndex(s => s.sessionId === sessionId);
      if (idx !== -1) sessions.splice(idx, 1);
    },
    findByUserId(userId: string) {
      return sessions.filter(s => s.userId === userId && s.expiresAt > new Date());
    },
  };
}

function createPromptStore() {
  let prompts: Prompt[] = [];
  return {
    findByUserId(userId: string) {
      return prompts.filter(p => p.userId === userId);
    },
    findById(id: string) {
      return prompts.find(p => p.id === id);
    },
    create(prompt: Prompt) {
      prompts.push(prompt);
      return prompt;
    },
    update(id: string, data: Partial<Prompt>) {
      const prompt = prompts.find(p => p.id === id);
      if (!prompt) return null;
      Object.assign(prompt, data);
      return prompt;
    },
    delete(id: string) {
      const idx = prompts.findIndex(p => p.id === id);
      if (idx !== -1) prompts.splice(idx, 1);
    },
    all() {
      return prompts;
    },
  };
}

export const usersStore = createUserStore();
export const sessionsStore = createSessionStore();
export const promptsStore = createPromptStore();

