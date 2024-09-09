import axios from 'axios';
import { Todo } from '../types'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const insertTodo = async (todo: Todo): Promise<number> => {
  const response = await axios.post(baseUrl, todo)
  return response.status
}

export const removeTodo = async (todoId: string): Promise<number> => {
  const response = await axios.delete(`${baseUrl}/${todoId}`)
  return response.status
  
}

export const alterTodo = async (todo: Todo): Promise<number> => {
  const response = await axios.put(`${baseUrl}/${todo.id}`, todo)
  return response.status
}