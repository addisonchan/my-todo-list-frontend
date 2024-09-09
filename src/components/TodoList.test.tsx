import { render, screen } from '@testing-library/react'
import { TodoList } from './TodoList'
import { useTodo } from '../context'

// Mock the useTodo hook
jest.mock('../context', () => ({
  useTodo: jest.fn(),
}))

const mockUseTodo = useTodo as jest.MockedFunction<typeof useTodo>

describe('TodoList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders loading state', () => {
    mockUseTodo.mockReturnValue({
      todos: [],
      isLoading: true,
      apiError: null,
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
      updateTodoText: jest.fn(),
      updateTodoStatus: jest.fn(),
      refreshTodos: jest.fn(),
    })

    render(<TodoList />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.getByRole('img', { hidden: true })).toHaveClass(
      'anticon-loading',
    )
  })

  test('renders error state', () => {
    mockUseTodo.mockReturnValue({
      todos: [],
      isLoading: false,
      apiError: new Error('Error fetching todos'),
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
      updateTodoText: jest.fn(),
      updateTodoStatus: jest.fn(),
      refreshTodos: jest.fn(),
    })

    render(<TodoList />)

    expect(
      screen.getByText('Something went wrong! Please try again.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', { hidden: true })).toHaveClass(
      'anticon-frown',
    )
  })

  test('renders empty state', () => {
    mockUseTodo.mockReturnValue({
      todos: [],
      isLoading: false,
      apiError: null,
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
      updateTodoText: jest.fn(),
      updateTodoStatus: jest.fn(),
      refreshTodos: jest.fn(),
    })

    render(<TodoList />)

    expect(screen.getByText('Nothing to do!')).toBeInTheDocument()
    expect(screen.getByRole('img', { hidden: true })).toHaveClass(
      'anticon-smile',
    )
  })

  test('renders todo items', () => {
    const todos = [
      { id: '1', text: 'Test Todo 1', isDone: false },
      { id: '2', text: 'Test Todo 2', isDone: true },
    ]

    mockUseTodo.mockReturnValue({
      todos,
      isLoading: false,
      apiError: null,
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
      updateTodoText: jest.fn(),
      updateTodoStatus: jest.fn(),
      refreshTodos: jest.fn(),
    })

    render(<TodoList />)

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument()
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument()
  })
})
