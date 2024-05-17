import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog.jsx'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import Togglable from './components/Togglable.jsx'

import blogService from './services/blogs.js'
import loginService from './services/login.js'
import BlogForm from './components/BlogForm.jsx'

import { displayMessage } from './reducers/notificationReducer.js'
import { getAllBlogs, createBlog } from './reducers/blogReducer.js'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => {
    console.log(state.blogs)
    return state.blogs
  })

  const [blogss, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogRef = useRef()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = window.localStorage.getItem('loggedBlogUser')
    if (user) {
      const userJSON = JSON.parse(user)
      setUser(userJSON)
      blogService.setToken(userJSON.token)
    }
  }, [])

  const handleError = (err) => {
    console.error(err)
    dispatch(displayMessage(err.response.data.error, 'error'))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const data = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(data))
      setUser(data)
      blogService.setToken(data.token)
      setUsername('')
      setPassword('')
      dispatch(displayMessage(`Welcome back ${data.name}!`, 'success'))
    } catch (err) {
      handleError(err)
    }
  }

  const handleNewBlog = async (blog) => {
    try {
      dispatch(createBlog(blog))
      blogFormRef.current.resetForm()
      dispatch(
        displayMessage(
          `a new blog ${blog.title} by ${blog.author} added`,
          'success'
        )
      )
      blogRef.current.toggleVisibility()
    } catch (err) {
      handleError(err)
    }
  }

  const handleLike = async (id) => {
    const blog = blogs.find((b) => b.id === id)

    const blogToUpdate = {
      ...blog,
      user: blog.user.id,
      likes: (blog.likes += 1),
    }
    try {
      if (blog) {
        const updatedBlog = await blogService.updateOne(id, blogToUpdate)
        setBlogs((curr) => curr.map((b) => (b.id === id ? updatedBlog : b)))
      }
    } catch (err) {
      handleError(err)
    }
  }

  const handleDelete = async (id) => {
    const blog = blogs.find((b) => b.id === id)

    try {
      if (
        id &&
        blog &&
        window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
      ) {
        await blogService.deleteOne(id)
        setBlogs((curr) => curr.filter((b) => b.id !== id))
        dispatch(
          displayMessage(
            `You've successfully removed ${blog.title} by ${blog.author}`,
            'success'
          )
        )
      }
    } catch (err) {
      handleError(err)
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b?.likes - a?.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {!user && (
        <Togglable buttonLabel="login">
          <LoginForm
            handleSubmit={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </Togglable>
      )}

      {user && (
        <div>
          {user.name} logged in{' '}
          <button
            onClick={() => {
              window.localStorage.removeItem('loggedBlogUser')
              setUser(null)
            }}
          >
            logout
          </button>
        </div>
      )}
      {user && (
        <Togglable buttonLabel="new blog" ref={blogRef}>
          <BlogForm handleSubmit={handleNewBlog} ref={blogFormRef} />
        </Togglable>
      )}
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          isAuthor={user && blog.user.id === user.id}
        />
      ))}
    </div>
  )
}

export default App
