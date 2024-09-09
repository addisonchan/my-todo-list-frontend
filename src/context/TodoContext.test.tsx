import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { TodoProvider, TodoContext, TodoContextProps } from './TodoContext'
import { Todo }  from '../types'
import '@testing-library/jest-dom'

import { mockTodos } from '../../setupTests'

const mockNanoId = 'PTpZyNlykSGJtqDHESooa'
jest.mock('nanoid', () => { 
    return { nanoid : ()=>mockNanoId } 
})

describe('TodoContext', () => {
    test('fetches and provides todos', async () => {
        const TestComponent = () => {
            const context = React.useContext(TodoContext) as TodoContextProps
            if (!context) { 
                throw new Error('useTodo must be used within a TodoProvider')
            }
            const { todos } = context
            return (
                <div>
                    {todos.map((todo: Todo) => (
                        <div key={todo.id} data-testid='todo-item'>
                            {todo.id}
                            {todo.text}
                            {todo.isDone ? 'Done' : 'Not Done'}
                        </div>
                    ))}
                </div>
            )
        }

        render(
            <TodoProvider>
                <TestComponent />
            </TodoProvider>
        )

        await waitFor(() => {
            const htmlElements = screen.getAllByTestId('todo-item')
            expect(htmlElements).toHaveLength(mockTodos.length)

            mockTodos.forEach((todo, index) => {
                expect(htmlElements[index]).toHaveTextContent(`${todo.id}${todo.text}${todo.isDone ? 'Done' : 'Not Done'}`)
            })
        })
    })

    test('adds a new todo', async () => {
        const newTodo = { id: 'WA6HjPU2gHUCfliHsATtk', text: 'New Todo', isDone: false }

        const TestComponent = () => {
            const context = React.useContext(TodoContext) as TodoContextProps
            if (!context) { 
                throw new Error('useTodo must be used within a TodoProvider')
            }
            const { todos, addTodo } = context
            React.useEffect(() => {
                if (!todos.some(todo => todo.text === newTodo.text)) {  // prevent endless loop
                    addTodo(newTodo.text)
                }
            });
            return (
                <div>
                    {todos.map(todo => (
                        <div key={todo.id} data-testid="todo-item">
                            {todo.text}
                        </div>
                    ))}
                </div>
            );
        };

        render(
            <TodoProvider>
                <TestComponent />
            </TodoProvider>
        );

        await waitFor(() => {
            expect(screen.getAllByTestId('todo-item')).toHaveLength(mockTodos.length + 1)
            expect(screen.getByText(newTodo.text)).toBeInTheDocument()
        })
    })

    test('deletes a todo', async () => {
        const TestComponent = () => {
            const context = React.useContext(TodoContext) as TodoContextProps
            if (!context) { 
                throw new Error('useTodo must be used within a TodoProvider')
            }
            const { todos, deleteTodo } = context
            React.useEffect(() => {
                deleteTodo(mockTodos[0].id)
            });
            return (
                <div>
                    {todos.map(todo => (
                        <div key={todo.id} data-testid="todo-item">
                            {todo.text}
                        </div>
                    ))}
                </div>
            );
        };

        render(
            <TodoProvider>
                <TestComponent />
            </TodoProvider>
        )

        await waitFor(() => {
            expect(screen.getAllByTestId('todo-item')).toHaveLength(mockTodos.length - 1)
            expect(screen.queryByText(mockTodos[0].text)).not.toBeInTheDocument()
        })
    })

    test('updates a todo text', async () => {
        const updatedText = 'Updated Todo Text';

        const TestComponent = () => {
            const context = React.useContext(TodoContext) as TodoContextProps
            if (!context) { 
                throw new Error('useTodo must be used within a TodoProvider')
            }
            const { todos, updateTodoText } = context
            React.useEffect(() => {
                updateTodoText(mockTodos[0].id, updatedText)
            })
            return (
                <div>
                    {todos.map(todo => (
                        <div key={todo.id} data-testid="todo-item">
                            {todo.text}
                        </div>
                    ))}
                </div>
            )
        }

        render(
            <TodoProvider>
                <TestComponent />
            </TodoProvider>
        )

        await waitFor(() => {
            expect(screen.getByText(updatedText)).toBeInTheDocument()
        })
    })

    test('updates a todo status', async () => {
        const TestComponent = () => {
            const context = React.useContext(TodoContext) as TodoContextProps
            if (!context) { 
                throw new Error('useTodo must be used within a TodoProvider')
            }
            const { todos, updateTodoStatus } = context
            React.useEffect(() => {
                updateTodoStatus(mockTodos[0].id)
            })
            return (
                <div>
                    {todos.map(todo => (
                        <div key={todo.id} data-testid="todo-item">
                            {todo.text} - {todo.isDone ? 'Done' : 'Not Done'}
                        </div>
                    ))}
                </div>
            )
        }

        render(
            <TodoProvider>
                <TestComponent />
            </TodoProvider>
        )

        await waitFor(() => {
            expect(screen.getByText(`${mockTodos[0].text} - Done`)).toBeInTheDocument()
        })
    })
})