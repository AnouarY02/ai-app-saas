type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
};

let users: User[] = [];

export function getUserById(userId: string): User | undefined {
  return users.find(u => u.id === userId);
}

export function setUsers(newUsers: User[]) {
  users = newUsers;
}
