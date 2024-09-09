import React, { createContext, useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Todo } from '../types'
import { fetchTodos, insertTodo, removeTodo, alterTodo } from '../apis'
import { toast } from 'react-hot-toast'

export interface TodoContextProps {
  todos: Todo[]
  addTodo: (text: string) => void
  deleteTodo: (id: string) => void
  updateTodoText: (id: string, text: string) => void
  updateTodoStatus: (id: string) => void
  refreshTodos: () => void
  isLoading: boolean
  apiError: Error | null
}

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined,
)

export const TodoProvider = (props: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState<Error | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const data = await fetchTodos()
      setTodos(data)
    } catch (error) {
      setApiError(error as Error)
      console.error(apiError)
    }
    setIsLoading(false)
  }

  const insertData = async (todo: Todo) => {
    setIsLoading(true)
    try {
      insertTodo(todo)
      setTodos([...todos, todo])
      toast.success('Todo added successfully!')
    } catch (error) {
      setApiError(error as Error)
      toast.error('Failed to add todo!')
      console.error(apiError)
    }
    setIsLoading(false)
  }

  const removeData = async (todoId: string) => {
    setIsLoading(true)
    try {
      await removeTodo(todoId)
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId))
      toast.success('Todo deleted successfully!')
    } catch (error) {
      setApiError(error as Error)
      toast.error('Failed to delete todo!')
      console.error(apiError)
    }
    setIsLoading(false)
  }

  const alterDataIsDone = async (todoId: string) => {
    setIsLoading(true)
    try {
      const updatedTodos = todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            isDone: !todo.isDone,
          }
        }
        return todo
      })
      const todoToBeUpdated = updatedTodos.find(
        todo => todo.id === todoId,
      ) as Todo
      if (todoToBeUpdated) {
        await alterTodo(todoToBeUpdated)
        setTodos(updatedTodos)
        toast.success('Todo status updated successfully!')
      }
    } catch (error) {
      setApiError(error as Error)
      toast.error('Failed to update todo status!')
      console.error(apiError)
    }
    setIsLoading(false)
  }

  const alterDataText = async (todoId: string, todoText: string) => {
    setIsLoading(true)
    try {
      const updatedTodos = todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            text: todoText,
          }
        }
        return todo
      })
      const todoToBeUpdated = updatedTodos.find(
        todo => todo.id === todoId,
      ) as Todo
      if (todoToBeUpdated) {
        await alterTodo(todoToBeUpdated)
        setTodos(updatedTodos)
        toast.success('Todo updated successfully!')
      }
    } catch (error) {
      setApiError(error as Error)
      toast.error('Failed to update todo!')
      console.error(apiError)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: nanoid(),
      text,
      isDone: false,
    }
    insertData(newTodo)
  }

  const deleteTodo = (id: string) => {
    removeData(id)
  }
  const updateTodoText = (id: string, text: string) => {
    alterDataText(id, text)
  }

  const updateTodoStatus = (id: string) => {
    alterDataIsDone(id)
  }

  const refreshTodos = () => {
    fetchData()
  }

  const value: TodoContextProps = {
    todos,
    addTodo,
    deleteTodo,
    updateTodoText,
    updateTodoStatus,
    refreshTodos,
    isLoading,
    apiError,
  }

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  )
}
