import { useEffect, useRef, useState } from 'react'
import { useTodo } from '../context'
import type { Todo } from '../types'
import { Input } from './Input'
import { Button } from 'antd'
import {
  CheckSquareOutlined,
  EditOutlined,
  DeleteOutlined,
  SyncOutlined,
  UpOutlined,
} from '@ant-design/icons'
import cn from 'classnames'
import { motion } from 'framer-motion'

export const TodoItem = (props: { todo: Todo }) => {
  const { todo } = props

  const [editingTodoText, setEditingTodoText] = useState<string>('')
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null)

  const { deleteTodo, updateTodoText, updateTodoStatus } = useTodo()

  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingTodoId !== null && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingTodoId])

  const handleEdit = (todoId: string, todoText: string) => {
    setEditingTodoId(todoId)
    setEditingTodoText(todoText)

    if (editInputRef.current) {
      editInputRef.current.focus()
    }
  }

  const handleUpdate = (todoId: string) => {
    if (editingTodoText.trim() !== '') {
      updateTodoText(todoId, editingTodoText)
      setEditingTodoId(null)
      setEditingTodoText('')
    }
  }

  const handleDelete = (todoId: string) => {
    deleteTodo(todoId)
  }

  const handleStatusUpdate = (todoId: string) => {
    updateTodoStatus(todoId)
  }

  const handleSubmission = (event: React.FormEvent) => {
    event.preventDefault()
    handleUpdate(todo.id)
  }

  return (
    <motion.li
      layout
      key={todo.id}
      className={cn(
        'p-5 rounded-xl bg-zinc-900',
        todo.isDone && 'bg-opacity-50 text-zinc-500',
      )}
    >
      {editingTodoId === todo.id ? (
        <form onSubmit={handleSubmission}>
          <motion.div layout className="flex gap-2">
            <Input
              ref={editInputRef}
              type="text"
              value={editingTodoText}
              onChange={e => setEditingTodoText(e.target.value)}
            />
            <Button
              className="px-5 py-5 text-base font-normal text-orange-300 bg-orange-900 border-2 border-orange-900 active:scale-95 rounded-xl"
              onClick={() => handleUpdate(todo.id)}
              icon={<UpOutlined />}
            >
              Update
            </Button>
          </motion.div>
        </form>
      ) : (
        <div className="flex flex-col gap-5">
          <motion.span
            layout
            style={{
              textDecoration: todo.isDone ? 'line-through' : 'none',
            }}
            className="text-xl font-bold"
          >
            {todo.text}
          </motion.span>
          <div className="flex justify-between gap-5">
            <Button
              type="text"
              onClick={() => handleStatusUpdate(todo.id)}
              className="items-center text-base text-white"
            >
              {todo.isDone ? (
                <span className="px-2 py-2 rounded-xl hover:bg-blue-300">
                  <SyncOutlined className="mr-2" />
                  Mark Undone
                </span>
              ) : (
                <span className="px-2 py-2 rounded-xl hover:bg-blue-300">
                  <CheckSquareOutlined className="mr-2" />
                  Mark Done
                </span>
              )}
            </Button>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleEdit(todo.id, todo.text)}
                className="items-center text-base text-white"
                type="text"
              >
                <span className="hover:bg-blue-300 px-2 py-2 rounded-xl">
                  <EditOutlined />
                  Edit
                </span>
              </Button>
              <Button
                onClick={() => handleDelete(todo.id)}
                className="items-center text-base text-red-500"
                type="text"
              >
                <span className="hover:bg-red-300 px-2 py-2 rounded-xl">
                  <DeleteOutlined />
                  Delete
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.li>
  )
}
