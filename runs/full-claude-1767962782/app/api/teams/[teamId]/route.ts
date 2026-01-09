import { NextRequest, NextResponse } from 'next/server';
import { getTeamById } from '../../../../lib/data/teams';

export async function GET(req: NextRequest, { params }: { params: { teamId: string } }) {
  const team = await getTeamById(params.teamId);
  if (!team) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(team);
}

export async function PATCH() {
  // MVP: Not implemented
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

export async function DELETE() {
  // MVP: Not implemented
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

