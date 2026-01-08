import { NextRequest, NextResponse } from 'next/server';
import { getUserFromSession } from '../../../../lib/auth/session';
import { getBoardById } from '../../../../lib/data/board';

export async function GET(req: NextRequest, { params }: { params: { boardId: string } }) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const board = getBoardById(params.boardId);
  if (!board || board.ownerId !== user.id) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ board });
}

// PATCH/DELETE kunnen hier worden toegevoegd voor MVP uitbreidingen

