import { NextRequest, NextResponse } from 'next/server';
import { getTeams, addTeam } from '../../../lib/data';
import { Team } from '../../../lib/types';

export async function GET() {
  const teams = await getTeams();
  return NextResponse.json(teams);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const team: Team = {
    id: 't' + Date.now(),
    name: data.name,
    memberIds: data.memberIds || [],
  };
  await addTeam(team);
  return NextResponse.json(team, { status: 201 });
}

