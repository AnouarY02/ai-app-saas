import React, { useEffect, useState } from 'react'
import { Task, getTask, getComments, createComment, Comment } from '../utils/apiClient'
import CommentList from './CommentList'

interface TaskModalProps {
  task: Task
  onClose: () => void
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
  const [details, setDetails] = useState<Task | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [error, setError] = useState<string | null>(null)

  const fetchDetails = async () => {
    setLoading(true)
    try {
      const [t, c] = await Promise.all([
        getTask(task.id),
        getComments(task.id)
      ])
      setDetails(t)
      setComments(c)
    } catch {
      setError('Failed to load task details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDetails()
    // eslint-disable-next-line
  }, [task.id])

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return
    try {
      await createComment(task.id, comment)
      setComment('')
      fetchDetails()
    } catch {
      setError('Failed to add comment')
    }
  }

  if (!details) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-2">{details.title}</h2>
        <div className="mb-2 text-gray-700">{details.description}</div>
        <div className="mb-2 text-xs text-gray-400">Status: {details.status} | Due: {new Date(details.dueDate).toLocaleDateString()}</div>
        <div className="mb-4">
          <strong>Comments</strong>
          <CommentList comments={comments} />
          <form className="flex gap-2 mt-2" onSubmit={handleComment}>
            <input
              className="flex-1 border rounded px-2 py-1"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button className="bg-blue-600 text-white px-3 py-1 rounded" type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TaskModal
