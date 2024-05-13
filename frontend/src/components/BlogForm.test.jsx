import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm.jsx'
import { expect } from 'vitest'

describe('<BlogForm />', () => {
  test('creating a new blog calls the event handler', async () => {
    const mockHandler = vi.fn()

    const { container } = render(<BlogForm handleSubmit={mockHandler} />)

    const user = userEvent.setup()

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')

    await user.type(titleInput, 'Fleur De Peau')
    await user.type(authorInput, 'Sarah Jane')
    await user.type(urlInput, 'srhqmp.com')

    const button = screen.getByText('create')

    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('Fleur De Peau')
    expect(mockHandler.mock.calls[0][0].author).toBe('Sarah Jane')
    expect(mockHandler.mock.calls[0][0].url).toBe('srhqmp.com')
  })
})
