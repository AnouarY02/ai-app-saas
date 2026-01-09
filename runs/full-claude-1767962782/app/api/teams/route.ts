import { NextRequest, NextResponse } from 'next/server';
import { getTeams, createTeam } from '../../../lib/data/teams';

export async function GET() {
  const teams = await getTeams();
  return NextResponse.json(teams);
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 });
  const team = await createTeam({ name });
  return NextResponse.json(team);
}

