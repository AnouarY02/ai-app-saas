import { NextRequest, NextResponse } from 'next/server';
import { usersStore } from '../../../lib/store';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const user = usersStore.find((u) => u.email === email);
  if (!user) {
    return NextResponse.json({ error: 'Gebruiker niet gevonden' }, { status: 401 });
  }
  // Simpele auth: geen wachtwoord, alleen email check (MVP)
  // In productie: JWT/cookies etc.
  return NextResponse.json({ user });
}

