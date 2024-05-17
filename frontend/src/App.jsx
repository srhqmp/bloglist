import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog.jsx'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import Togglable from './components/Togglable.jsx'

import BlogForm from './components/BlogForm.jsx'

import {
  getAllBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from './reducers/blogReducer.js'
import { logoutUser, updateUser } from './reducers/userReducer.js'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const blogRef = useRef()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(updateUser())
  }, [dispatch])

  const handleNewBlog = (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.resetForm()
    blogRef.current.toggleVisibility()
  }

  const handleLike = (id) => {
    const blog = blogs.find((b) => b.id === id)
    if (blog) {
      dispatch(likeBlog(blog))
    }
  }

  const handleDelete = (id) => {
    const blog = blogs.find((b) => b.id === id)
    if (id && window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b?.likes - a?.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {!user && (
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      )}

      {user && (
        <div>
          {user.name} logged in{' '}
          <button onClick={() => dispatch(logoutUser())}>logout</button>
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
