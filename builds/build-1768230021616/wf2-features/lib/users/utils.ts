type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "manager" | "member";
  clubId: string;
};

const users: User[] = [
  {
    id: "user-1",
    name: "Alice Admin",
    email: "alice@padel.com",
    passwordHash: "hashed-password",
    role: "admin",
    clubId: "club-1",
  },
  {
    id: "user-2",
    name: "Bob Manager",
    email: "bob@padel.com",
    passwordHash: "hashed-password",
    role: "manager",
    clubId: "club-1",
  },
];

export async function getUsers(): Promise<User[]> {
  return users;
}

export async function createUser(data: { name: string; email: string; passwordHash: string; role: "admin" | "manager" | "member"; clubId: string }): Promise<User> {
  const newUser: User = {
    id: `user-${users.length + 1}`,
    ...data,
  };
  users.push(newUser);
  return newUser;
}
