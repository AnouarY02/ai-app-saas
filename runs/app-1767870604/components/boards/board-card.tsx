import Link from 'next/link';
import { Board } from '../../lib/types';

export default function BoardCard({ board }: { board: Board }) {
  return (
    <Link href={`/boards/${board.id}`} className="block bg-white rounded shadow p-6 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{board.title}</h2>
      <div className="text-gray-500 text-sm">Aangemaakt op {new Date(board.createdAt).toLocaleDateString()}</div>
    </Link>
  );
}

