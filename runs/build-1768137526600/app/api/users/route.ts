import { NextRequest, NextResponse } from 'next/server';
import { usersStore } from '../../../lib/store';

export async function GET() {
  return NextResponse.json(usersStore.getAll());
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.name || !data.email || !data.role) {
    return NextResponse.json({ error: 'Naam, email en rol verplicht' }, { status: 400 });
  }
  const user = usersStore.create({ ...data, credits: data.credits ?? 0 });
  return NextResponse.json(user);
}

