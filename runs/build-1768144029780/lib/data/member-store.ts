import { v4 as uuid } from "uuid";

export interface Member {
  id: string;
  clubId: string;
  name: string;
  email: string;
  role: string;
  password?: string; // Alleen voor MVP auth
}

const members: Member[] = [
  { id: "m1", clubId: "club1", name: "Alice", email: "alice@padel.nl", role: "admin", password: "test" },
  { id: "m2", clubId: "club1", name: "Bob", email: "bob@padel.nl", role: "member", password: "test" },
  { id: "m3", clubId: "club2", name: "Carol", email: "carol@padel.nl", role: "admin", password: "test" }
];

export async function getMembersByClub(clubId: string): Promise<Member[]> {
  return members.filter(m => m.clubId === clubId);
}

export async function getMemberById(id: string): Promise<Member | undefined> {
  return members.find(m => m.id === id);
}

export async function getMemberByEmail(email: string): Promise<Member | undefined> {
  return members.find(m => m.email === email);
}

export async function addMember(data: { clubId: string; name: string; email: string; role: string; password?: string }): Promise<Member> {
  const member = { id: uuid(), ...data };
  members.push(member);
  return member;
}

export async function updateMember(id: string, data: Partial<Member>): Promise<Member | undefined> {
  const member = members.find(m => m.id === id);
  if (!member) return undefined;
  Object.assign(member, data);
  return member;
}

export async function deleteMember(id: string): Promise<boolean> {
  const idx = members.findIndex(m => m.id === id);
  if (idx === -1) return false;
  members.splice(idx, 1);
  return true;
}

