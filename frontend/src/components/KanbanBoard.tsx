import React, { useEffect, useState } from 'react'
import { Board, getTasks, Task } from '../utils/apiClient'
import TaskCard from './TaskCard'

interface KanbanBoardProps {
  board: Board
}

const statusColors: Record<string, string> = {
  'todo': 'bg-gray-100',
  'in-progress': 'bg-yellow-100',
  'done': 'bg-green-100',
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ board }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getTasks({ projectId: board.projectId })
      .then(setTasks)
      .catch(() => setError('Failed to load tasks'))
      .finally(() => setLoading(false))
  }, [board.projectId])

  if (loading) return <div>Loading board...</div>
  if (error) return <div className="text-red-600">{error}</div>

  // Map column.taskIds to actual tasks
  const getTasksForColumn = (colId: string) => {
    const col = board.columns.find(c => c.id === colId)
    if (!col) return []
    return col.taskIds.map(tid => tasks.find(t => t.id === tid)).filter(Boolean) as Task[]
  }

  return (
    <div className="flex gap-4 overflow-x-auto">
      {board.columns.map(col => (
        <div key={col.id} className="flex-1 min-w-[260px]">
          <div className={`p-3 rounded-t font-semibold text-center ${statusColors[col.name.toLowerCase()] || 'bg-gray-100'}`}>{col.name}</div>
          <div className="bg-white rounded-b shadow min-h-[120px] p-2 flex flex-col gap-2">
            {getTasksForColumn(col.id).length === 0 ? (
              <div className="text-gray-400 text-center py-4">No tasks</div>
            ) : (
              getTasksForColumn(col.id).map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default KanbanBoard
