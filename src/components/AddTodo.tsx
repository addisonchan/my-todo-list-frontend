import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTodo } from '../context'
import { Input } from './Input'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export const AddTodo = () => {
  const [input, setInput] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { addTodo } = useTodo()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])


  const addTodoInput = () => {
    if (input.trim() !== '') {
      addTodo(input)
      setInput('')
    } else {
      toast.error('Todo field cannot be empty!')
    }
  }

  const handleSubmission = (event: React.FormEvent) => {
    event.preventDefault()
    addTodoInput()
  }

  return (
    <form onSubmit={handleSubmission}>
      <div className="flex items-center w-full max-w-lg gap-2 p-5 m-auto">
        <Input
          ref={inputRef}
          type="text"
          placeholder="input your todo ..."
          value={input}
          onChange={event => setInput(event.target.value)}
        />
        <Button
          onClick={() => {addTodoInput()}}
          icon={<PlusOutlined />}
          className="px-5 py-5 text-base font-normal text-blue-300 bg-blue-900 border-2 border-blue-900 active:scale-95 rounded-xl"
        >
          Add
        </Button>
      </div>
    </form>
  )
}
