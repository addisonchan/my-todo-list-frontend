import { render, screen, fireEvent } from '@testing-library/react'
import { AddTodo } from './AddTodo'
import { useTodo } from '../context'
import { toast } from 'react-hot-toast'

// Mock the useTodo hook
jest.mock('../context', () => ({
  useTodo: jest.fn(),
}))

// Mock the toast function
jest.mock('react-hot-toast', () => ({
  toast: {
    error: jest.fn(),
  },
}))

const mockUseTodo = useTodo as jest.MockedFunction<typeof useTodo>
const mockAddTodo = jest.fn()

describe('AddTodo', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseTodo.mockReturnValue({
      addTodo: mockAddTodo,
      todos: [],
      deleteTodo: jest.fn(),
      updateTodoText: jest.fn(),
      updateTodoStatus: jest.fn(),
      refreshTodos: jest.fn(),
      isLoading: false,
      apiError: null,
    })
  })

  test('renders the input and button', () => {
    render(<AddTodo />)

    expect(
      screen.getByPlaceholderText('input your todo ...'),
    ).toBeInTheDocument()
    expect(screen.getByText('Add')).toBeInTheDocument()
  })

  test('calls addTodo when the form is submitted with a non-empty input', () => {
    render(<AddTodo />)

    const input = screen.getByPlaceholderText('input your todo ...')
    const button = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'New Todo' } })
    fireEvent.click(button)

    expect(mockAddTodo).toHaveBeenCalledWith('New Todo')
    expect(input).toHaveValue('')
  })

  test('shows an error toast when the form is submitted with an empty input', () => {
    render(<AddTodo />)

    const button = screen.getByText('Add')

    fireEvent.click(button)

    expect(toast.error).toHaveBeenCalledWith('Todo field cannot be empty!')
  })

  test('focuses the input on initial render', () => {
    render(<AddTodo />)

    const input = screen.getByPlaceholderText('input your todo ...')
    expect(input).toHaveFocus()
  })
})
