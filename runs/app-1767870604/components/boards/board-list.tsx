import { useEffect, useState } from 'react';
import BoardCard from './board-card';
import { Board } from '../../lib/types';

export default function BoardList() {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    fetch('/api/boards')
      .then(res => res.json())
      .then(data => setBoards(data.boards || []));
  }, []);

  if (!boards.length) {
    return <div className="text-gray-500">Nog geen borden. Maak er een aan!</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {boards.map(board => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
}

