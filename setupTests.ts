import '@testing-library/jest-dom'
import axios from 'axios'

import { Todo } from './src/types'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

export const mockTodos: Todo[] = [
    { id: '5z33gw9ubPY35QDw4eRrO', text: 'Test Todo 1', isDone: false },
    { id: 'ym_ssIdTvO1-06k4WOYbf', text: 'Test Todo 2', isDone: true },
]
mockedAxios.get.mockResolvedValue({ data: mockTodos })

mockedAxios.post.mockResolvedValue({ status: 201 })
mockedAxios.delete.mockResolvedValue({ status: 204 })
mockedAxios.put.mockResolvedValue({ status: 200 })