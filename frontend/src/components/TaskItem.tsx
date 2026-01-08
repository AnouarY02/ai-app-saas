import React from 'react'
import { Task } from '../utils/apiClient'
import { Link } from 'react-router-dom'
import { FaRegEdit, FaTrash, FaCheckCircle, FaHourglassHalf, FaRegCircle } from 'react-icons/fa'

interface TaskItemProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

const statusIcon = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return <FaCheckCircle className="text-green-500" title="Completed" />
    case 'in_progress':
      return <FaHourglassHalf className="text-yellow-500" title="In Progress" />
    default:
      return <FaRegCircle className="text-gray-400" title="Pending" />
  }
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    <li className="flex items-center justify-between bg-white rounded shadow p-4">
      <div className="flex items-center gap-3">
        {statusIcon(task.status)}
        <Link to={`/tasks/${task.id}`} className="font-semibold text-blue-700 hover:underline">
          {task.title}
        </Link>
        {task.dueDate && (
          <span className="ml-2 text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onEdit(task)} className="p-1 rounded hover:bg-gray-100" title="Edit">
          <FaRegEdit className="text-blue-600" />
        </button>
        <button onClick={() => onDelete(task)} className="p-1 rounded hover:bg-gray-100" title="Delete">
          <FaTrash className="text-red-500" />
        </button>
      </div>
    </li>
  )
}

export default TaskItem
