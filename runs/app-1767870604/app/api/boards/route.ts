import { NextRequest, NextResponse } from 'next/server';
import { getUserFromSession } from '../../../lib/auth/session';
import { getBoardsByOwner, createBoard } from '../../../lib/data/board';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const boards = getBoardsByOwner(user.id);
  return NextResponse.json({ boards });
}

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { title } = await req.json();
  if (!title) return NextResponse.json({ error: 'Titel verplicht' }, { status: 400 });
  const board = {
    id: uuidv4(),
    title,
    ownerId: user.id,
    createdAt: new Date().toISOString(),
  };
  createBoard(board);
  return NextResponse.json({ board });
}

