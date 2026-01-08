import { NextRequest, NextResponse } from 'next/server';
import { getUserFromSession } from '../../../../../lib/auth/session';
import { getBoardById } from '../../../../../lib/data/board';
import { getColumnsByBoard, createColumn } from '../../../../../lib/data/column';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest, { params }: { params: { boardId: string } }) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const board = getBoardById(params.boardId);
  if (!board || board.ownerId !== user.id) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const columns = getColumnsByBoard(board.id);
  return NextResponse.json({ columns });
}

export async function POST(req: NextRequest, { params }: { params: { boardId: string } }) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const board = getBoardById(params.boardId);
  if (!board || board.ownerId !== user.id) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const { title } = await req.json();
  if (!title) return NextResponse.json({ error: 'Titel verplicht' }, { status: 400 });
  const order = getColumnsByBoard(board.id).length;
  const column = {
    id: uuidv4(),
    boardId: board.id,
    title,
    order,
  };
  createColumn(column);
  return NextResponse.json({ column });
}

