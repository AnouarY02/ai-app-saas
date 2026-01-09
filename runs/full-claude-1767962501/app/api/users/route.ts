import { NextRequest, NextResponse } from 'next/server';
import { getUsers, addUser } from '../../../lib/data';
import { User } from '../../../lib/types';

export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const user: User = {
    id: 'u' + Date.now(),
    name: data.name,
    email: data.email,
    avatarUrl: data.avatarUrl,
    teamIds: data.teamIds || [],
  };
  await addUser(user);
  return NextResponse.json(user, { status: 201 });
}

