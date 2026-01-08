import { getBoardById } from '../../../../lib/data/board';
import { getUserFromSession } from '../../../../lib/auth/session';
import { notFound } from 'next/navigation';

export default async function BoardSettingsPage({ params }: { params: { boardId: string } }) {
  const user = await getUserFromSession();
  const board = await getBoardById(params.boardId);
  if (!board || board.ownerId !== user?.id) {
    notFound();
  }
  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Bord Instellingen</h1>
      <div className="bg-white rounded shadow p-6">
        <div className="mb-4">
          <span className="font-semibold">Naam:</span> {board.title}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Aangemaakt op:</span> {new Date(board.createdAt).toLocaleString()}
        </div>
        {/* Bord bewerken/verwijderen functionaliteit kan hier */}
      </div>
    </div>
  );
}

