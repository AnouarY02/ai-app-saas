import TaskCard from '../tasks/task-card';
import AddTaskDialog from '../tasks/add-task-dialog';
import { Column as ColumnType, Task } from '../../lib/types';

export default function Column({ column, tasks }: { column: ColumnType; tasks: Task[] }) {
  return (
    <div className="bg-gray-100 rounded p-4 min-w-[280px] flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">{column.title}</h3>
        <AddTaskDialog columnId={column.id} onAdd={() => window.location.reload()} />
      </div>
      <div className="flex flex-col gap-3">
        {tasks.sort((a, b) => a.order - b.order).map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

