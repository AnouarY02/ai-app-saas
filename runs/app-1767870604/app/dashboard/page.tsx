import BoardList from '../../components/boards/board-list';
import AddBoardDialog from '../../components/boards/add-board-dialog';

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Mijn Borden</h1>
        <AddBoardDialog />
      </div>
      <BoardList />
    </div>
  );
}

