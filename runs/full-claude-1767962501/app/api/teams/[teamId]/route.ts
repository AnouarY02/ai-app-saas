import { NextRequest, NextResponse } from 'next/server';
import { getTeamById, updateTeam, deleteTeam } from '../../../../lib/data';

export async function GET(_req: NextRequest, { params }: { params: { teamId: string } }) {
  const team = await getTeamById(params.teamId);
  if (!team) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(team);
}

export async function PATCH(req: NextRequest, { params }: { params: { teamId: string } }) {
  const data = await req.json();
  await updateTeam(params.teamId, data);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { teamId: string } }) {
  await deleteTeam(params.teamId);
  return NextResponse.json({ ok: true });
}

