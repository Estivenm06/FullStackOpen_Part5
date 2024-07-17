import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateForm from '../components/CreateForm'
import { expect } from 'vitest'

test('new blog form', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()
  render(<CreateForm createBlog={createBlog}/>)

  const input = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.type(input[0], 'new blog form test')
  await user.type(input[1], 'test1')
  await user.type(input[2], 'www.test.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('new blog form test')
  expect(createBlog.mock.calls[0][0].author).toBe('test1')
  expect(createBlog.mock.calls[0][0].url).toBe('www.test.com')
})