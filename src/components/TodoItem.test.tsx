import { render, screen, fireEvent } from '@testing-library/react'
import { TodoItem } from './TodoItem'
import { useTodo } from '../context'
import { Todo } from '../types'

// Mock the useTodo hook
jest.mock('../context', () => ({
  useTodo: jest.fn(),
}))

const mockUseTodo = useTodo as jest.MockedFunction<typeof useTodo>

describe('TodoItem', () => {
  const mockDeleteTodo = jest.fn()
  const mockUpdateTodoText = jest.fn()
  const mockUpdateTodoStatus = jest.fn()

  const defaultProps = {
    todo: {
      id: '1',
      text: 'Test Todo',
      isDone: false,
    } as Todo,
  }

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTodo.mockReturnValue({
      deleteTodo: mockDeleteTodo,
      updateTodoText: mockUpdateTodoText,
      updateTodoStatus: mockUpdateTodoStatus,
      todos: [],
      addTodo: jest.fn(),
      refreshTodos: jest.fn(),
      isLoading: false,
      apiError: null,
    })
  })

    test('renders TodoItem', () => {
        render(<TodoItem {...defaultProps} />)

        expect(screen.getByText('Test Todo')).toBeInTheDocument()
        expect(screen.getByText(/Mark Done/i)).toBeInTheDocument()
        expect(screen.getByText(/Edit/i)).toBeInTheDocument()
        expect(screen.getByText(/Delete/i)).toBeInTheDocument()
    })

    test('calls updateTodoStatus when Mark Done button is clicked', () => {
        render(<TodoItem {...defaultProps} />)

        fireEvent.click(screen.getByText(/Mark Done/i))

        expect(mockUpdateTodoStatus).toHaveBeenCalledWith('1')
    })

    test('calls deleteTodo when Delete button is clicked', () => {
        render(<TodoItem {...defaultProps} />)

        fireEvent.click(screen.getByText(/Delete/i))

        expect(mockDeleteTodo).toHaveBeenCalledWith('1')
    })

    test('calls updateTodoText when Update button is clicked', () => {
        render(<TodoItem {...defaultProps} />)

        fireEvent.click(screen.getByText(/Edit/i))
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Updated Todo' } })
        fireEvent.click(screen.getByText(/Update/i))

        expect(mockUpdateTodoText).toHaveBeenCalledWith('1', 'Updated Todo')
    })

    test('displays text with line-through when isDone is true', () => {
        render(<TodoItem {...defaultProps} todo={{ ...defaultProps.todo, isDone: true }} />)

        expect(screen.getByText('Test Todo')).toHaveStyle('text-decoration: line-through')
    })
})