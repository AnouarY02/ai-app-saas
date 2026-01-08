import KanbanBoard from '../../../components/boards/kanban-board';
import { notFound } from 'next/navigation';
import { getBoardById } from '../../../lib/data/board';
import { getUserFromSession } from '../../../lib/auth/session';

export default async function BoardDetailPage({ params }: { params: { boardId: string } }) {
  const user = await getUserFromSession();
  const board = await getBoardById(params.boardId);
  if (!board || board.ownerId !== user?.id) {
    notFound();
  }
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <KanbanBoard boardId={params.boardId} />
    </div>
  );
}

