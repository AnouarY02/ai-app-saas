import React from 'react'
import { Task } from '../utils/apiClient'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEdit, FaTrashAlt, FaCheckCircle, FaHourglassHalf, FaRegCircle } from 'react-icons/fa'

interface TaskCardProps {
  task: Task
  onDelete: (id: string) => void
}

const statusMap: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  todo: { label: 'To Do', icon: <FaRegCircle />, color: 'text-gray-400' },
  in_progress: { label: 'In Progress', icon: <FaHourglassHalf />, color: 'text-yellow-500' },
  done: { label: 'Done', icon: <FaCheckCircle />, color: 'text-green-600' }
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col gap-2 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={statusMap[task.status].color}>{statusMap[task.status].icon}</span>
          <span className="font-semibold text-lg">{task.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-1 rounded hover:bg-blue-50"
            title="Edit"
            onClick={() => navigate(`/tasks/${task.id}`)}
          >
            <FaRegEdit className="text-blue-600" />
          </button>
          <button
            className="p-1 rounded hover:bg-red-50"
            title="Delete"
            onClick={() => onDelete(task.id)}
          >
            <FaTrashAlt className="text-red-500" />
          </button>
        </div>
      </div>
      {task.description && <div className="text-gray-600 text-sm">{task.description}</div>}
      {task.dueDate && (
        <div className="text-xs text-gray-400">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
      )}
    </div>
  )
}

export default TaskCard
