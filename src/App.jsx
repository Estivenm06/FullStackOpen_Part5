import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import './styles.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    try {
      const localStorage = window.localStorage.getItem('loggedUserBlog')
      if (localStorage) {
        const user = JSON.parse(localStorage)
        setUser(user)
        blogService.setToken(user.token)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const blogFormRef = useRef()

  const addBlog = async (noteObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(noteObject)
      setBlogs([...blogs, returnedBlog])
      setErrorMessage(
        <div className="errorGreen">{`a new blog ${noteObject.title} by ${noteObject.author}`}</div>
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(<div className="errorRed">{`${error}`}</div>)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createForm = () => {
    return (
      <div>
        <Togglable
          buttonLabel={'new blog'}
          ref={blogFormRef}
        ><CreateForm createBlog={addBlog}/></Togglable>
      </div>
    )
  }

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('loggedUserBlog')
    } catch (error) {
      console.log(error)
    }
  }


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUserBlog', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage(
        <div className="errorRed">Wrong username or password</div>
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLikes = async (id) => {
    const blogIndex = blogs.find((n) => n.id === id)
    const blogLikes = { ...blogIndex, likes: blogIndex.likes + 1 }
    await blogService.update(id, blogLikes).then((returnedLikes) => {
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedLikes)))
    })
  }

  const blogSorted = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  return (
    <div>
      <h2>Blogs</h2>
      <Error error={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <form onSubmit={handleLogout}>
            {user.name} logged in <button type="submit">logout</button>
          </form>
          {createForm()}
          {blogSorted.map((blog, id) => (
            <Blog
              key={id}
              id={blog.id}
              blog={blog}
              blogs={blogs}
              user={user}
              setBlogs={setBlogs}
              handleLikes={() => handleLikes(blog.id)}
              buttonLabel='view'
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App