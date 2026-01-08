import { useEffect, useState } from 'react';
import Column from '../columns/column';
import AddColumnDialog from '../columns/add-column-dialog';
import { Column as ColumnType, Task } from '../../lib/types';

export default function KanbanBoard({ boardId }: { boardId: string }) {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch(`/api/boards/${boardId}/columns`).then(res => res.json()).then(data => setColumns(data.columns || []));
  }, [boardId]);

  useEffect(() => {
    Promise.all(
      columns.map(col =>
        fetch(`/api/columns/${col.id}/tasks`).then(res => res.json()).then(data => ({ colId: col.id, tasks: data.tasks || [] }))
      )
    ).then(results => {
      setTasks(results.flatMap(r => r.tasks));
    });
  }, [columns]);

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Kanban Board</h2>
        <AddColumnDialog boardId={boardId} onAdd={() => window.location.reload()} />
      </div>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns
          .sort((a, b) => a.order - b.order)
          .map(col => (
            <Column key={col.id} column={col} tasks={tasks.filter(t => t.columnId === col.id)} />
          ))}
      </div>
    </div>
  );
}

