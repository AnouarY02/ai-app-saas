import { NextRequest, NextResponse } from 'next/server';
import { getUserFromSession } from '../../../../lib/auth/session';
import { getTaskById } from '../../../../lib/data/task';
import { getColumnById } from '../../../../lib/data/column';
import { getBoardById } from '../../../../lib/data/board';

export async function GET(req: NextRequest, { params }: { params: { taskId: string } }) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const task = getTaskById(params.taskId);
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const column = getColumnById(task.columnId);
  if (!column) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const board = getBoardById(column.boardId);
  if (!board || board.ownerId !== user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ task });
}

// PATCH/DELETE kunnen hier worden toegevoegd voor MVP uitbreidingen

