import { fetchTodos, insertTodo, removeTodo, alterTodo } from "./api"
import { Todo } from '../types'
import { mockTodos } from '../../setupTests'

describe("Todo APIs", () => {
  test("fetchTodos", async () => {
    const response = await fetchTodos()
    expect(response).toEqual(mockTodos)
  })

  test('insertTodo', async () => {
    const todo: Todo = { id: '5z33gw9ubPY35QDw4eRrO', text: 'Test Todo 1', isDone: false }
    const response = await insertTodo(todo)
    expect(response).toEqual(201)
  })

  test('removeTodo', async () => {
    const todoId = '5z33gw9ubPY35QDw4eRrO'
    const response = await removeTodo(todoId)
    expect(response).toEqual(204)
  })

  test('updateTodo', async () => {
    const todo: Todo = { id: '5z33gw9ubPY35QDw4eRrO', text: 'Test Todo 1', isDone: true }
    const response = await alterTodo(todo)
    expect(response).toEqual(200)
  })
})