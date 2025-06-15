/* eslint-disable linebreak-style */
/* eslint-disable quotes */
import { screen, render } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

describe('<Blog/ >', () => {
  let container
  const mockHandler = vi.fn()
  beforeEach(() => {
    const blog = {
      title: "this has to be render it",
      author: "test1",
      likes: 0,
      url: "www.test.com",
    }
    container = render(
      <Blog
        blog={blog}
        handleLikes={mockHandler}
        blogs={blogs}
      >
        <div className="divBlog">togglable content</div>
      </Blog>
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
