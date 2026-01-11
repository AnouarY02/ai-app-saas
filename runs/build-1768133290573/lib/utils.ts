// Mock hash/compare for demo; replace with bcrypt in prod
export function hashPassword(password: string): string {
  return `hashed_${password}`;
}

export function comparePassword(password: string, hash: string): boolean {
  return hash === hashPassword(password);
}

