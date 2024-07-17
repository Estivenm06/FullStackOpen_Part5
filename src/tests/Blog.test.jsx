import { screen, render } from '@testing-library/react'
import TogglableBlogs from '../components/TogglableBlogs'
import userEvent from '@testing-library/user-event'

describe('<TogglableBlogs/ >', () => {
  let container
  const mockHandler = vi.fn()
  beforeEach(() => {
    container = render(
      <TogglableBlogs
        buttonLabel="view"
        title="this has to be render it"
        author="test1"
        likes={0}
        url="www.test.com"
        handleLikes={mockHandler}
      >
        <div className="divBlog">togglable content</div>
      </TogglableBlogs>
    ).container
  })

  test('component displaying a blog', () => {
    const div = container.querySelector('.blog')
    const url = screen.queryByText('do not want this thing to be rendered')
    const likes = screen.queryByText(
      'do not want this thing to be rendered too'
    )
    expect(div).toHaveTextContent('this has to be render it')
    expect(div).toHaveTextContent('test1')
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('after clicking button url and number of likes are shown', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(0)
    expect(div).toHaveTextContent('www.test.com')
  })

  test('like button clicked twice', async () => {
    const user = userEvent.setup()
    const buttonView = screen.getByText('view')
    await user.click(buttonView)
    const div = container.querySelector('.blog')
    expect(div).toBeVisible()
    const buttonLike = screen.getByText('like')
    await user.click(buttonLike)
    await user.click(buttonLike)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
