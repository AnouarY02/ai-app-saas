import { NextRequest, NextResponse } from 'next/server';
import { usersStore } from '../../../lib/store';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  return NextResponse.json(usersStore);
}

export async function POST(req: NextRequest) {
  const { name, email, role } = await req.json();
  if (!name || !email || !role) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const user = {
    id: uuidv4(),
    name,
    email,
    role,
    createdAt: new Date(),
  };
  usersStore.push(user);
  return NextResponse.json(user, { status: 201 });
}

