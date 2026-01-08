import React from 'react'
import { Task } from '../utils/apiClient'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return <div className="text-center text-gray-500">No tasks found.</div>
  }
  return (
    <ul className="flex flex-col gap-2">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default TaskList
