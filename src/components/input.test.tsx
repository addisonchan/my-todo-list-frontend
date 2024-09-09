import React from 'react'
import { render, screen } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  test('renders the input with default props', () => {
    render(<Input placeholder="Enter text" />)

    const inputElement = screen.getByPlaceholderText('Enter text')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass(
      'w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-500 focus:border-white'
    )
  })

  test('renders the input with additional className', () => {
    render(<Input placeholder="Enter text" className="custom-class" />)

    const inputElement = screen.getByPlaceholderText('Enter text')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass('custom-class')
  })

  test('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input placeholder="Enter text" ref={ref} />)

    const inputElement = screen.getByPlaceholderText('Enter text')
    expect(ref.current).toBe(inputElement)
  })

  test('passes other props to the input element', () => {
    render(<Input placeholder="Enter text" data-testid="custom-input" />)

    const inputElement = screen.getByTestId('custom-input')
    expect(inputElement).toBeInTheDocument()
  })
})