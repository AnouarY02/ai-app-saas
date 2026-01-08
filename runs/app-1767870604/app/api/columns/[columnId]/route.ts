import { NextRequest, NextResponse } from 'next/server';
import { getUserFromSession } from '../../../../lib/auth/session';
import { getColumnById } from '../../../../lib/data/column';
import { getBoardById } from '../../../../lib/data/board';

export async function GET(req: NextRequest, { params }: { params: { columnId: string } }) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const column = getColumnById(params.columnId);
  if (!column) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const board = getBoardById(column.boardId);
  if (!board || board.ownerId !== user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ column });
}

// PATCH/DELETE kunnen hier worden toegevoegd voor MVP uitbreidingen

