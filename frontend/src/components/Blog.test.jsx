import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog.jsx'

describe('<Blog />', () => {
  let container = null
  const mockHandler = vi.fn()

  beforeEach(() => {
    const blog = {
      title: 'Fleur De Peau',
      author: 'Sarah Q.',
      likes: 12,
      url: 'srhqmp.com',
      user: {
        name: 'Sarah',
        username: 'srhqmp',
        id: 1,
      },
    }

    container = render(<Blog blog={blog} handleLike={mockHandler} />).container
  })

  test('renders blog\'s title and author initially', () => {
    const titleDiv = container.querySelector('.blog-card-title')
    const contentDiv = container.querySelector('.blog-card-content')

    expect(screen.getByText('Fleur De Peau Sarah Q.')).toBeInTheDocument()
    expect(titleDiv).not.toHaveStyle('display: none')
    expect(contentDiv).toHaveStyle('display: none')
  })

  test('displays blog url and likes when \'view\' button is clicked', async () => {
    const user = userEvent.setup()

    const contentDiv = container.querySelector('.blog-card-content')

    const button = screen.getByText('view')
    await user.click(button)

    expect(contentDiv).not.toHaveStyle('display: none')
  })

  test('clicking the like button twice calls the event handler twice', async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
