import React, { useState } from 'react'
import { Task } from '../utils/apiClient'
import TaskModal from './TaskModal'

interface TaskCardProps {
  task: Task
}

const statusColors: Record<string, string> = {
  'todo': 'bg-gray-200',
  'in-progress': 'bg-yellow-200',
  'done': 'bg-green-200',
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        className={`rounded p-3 shadow cursor-pointer flex flex-col gap-1 ${statusColors[task.status] || 'bg-gray-100'}`}
        onClick={() => setOpen(true)}
      >
        <div className="font-semibold">{task.title}</div>
        <div className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
        <div className="text-xs text-gray-400">Status: {task.status}</div>
      </div>
      {open && <TaskModal task={task} onClose={() => setOpen(false)} />}
    </>
  )
}

export default TaskCard
