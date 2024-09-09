import { TodoItem } from './TodoItem'
import { useTodo } from '../context'
import {
  SmileOutlined,
  LoadingOutlined,
  FrownOutlined,
} from '@ant-design/icons'

export const TodoList = () => {
  const { todos, isLoading, apiError: fetchError } = useTodo()

  if (isLoading || fetchError || !todos.length) {
    let icon = <SmileOutlined className="text-5xl" />
    let message = 'Nothing to do!'
    if (isLoading) {
      icon = <LoadingOutlined className="text-5xl" />
      message = 'Loading...'
    } else if (fetchError) {
      icon = <FrownOutlined className="text-5xl" />
      message = 'Something went wrong! Please try again.'
    }

    return (
      <div className="max-w-lg px-5 m-auto">
        <h1 className="flex flex-col items-center gap-5 px-5 py-10 text-xl font-bold text-center rounded-xl bg-zinc-900">
          {icon}
          {message}
        </h1>
      </div>
    )
  }

  return (
    <ul className="grid max-w-lg gap-2 px-5 m-auto">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  )
}
