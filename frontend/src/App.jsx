import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Blog from './components/Blog.jsx'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import Togglable from './components/Togglable.jsx'

import BlogForm from './components/BlogForm.jsx'

import { getAllBlogs, createBlog } from './reducers/blogReducer.js'
import { logoutUser, updateUser } from './reducers/userReducer.js'
import { getAllUsers } from './reducers/usersReducer.js'

const BlogsPage = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b?.likes - a?.likes)

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [dispatch])

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

const BlogFormPage = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const blogRef = useRef()

  const user = useSelector((state) => state.user)

  const handleNewBlog = (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.resetForm()
    blogRef.current.toggleVisibility()
  }

  return (
    <div>
      {user && (
        <Togglable buttonLabel="new blog" ref={blogRef}>
          <BlogForm handleSubmit={handleNewBlog} ref={blogFormRef} />
        </Togglable>
      )}
    </div>
  )
}

const UsersPage = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <div>
      <h1>Users</h1>
      {users ? (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(updateUser())
  }, [dispatch])

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
          {user.name} logged in
          <div>
            <button onClick={() => dispatch(logoutUser())}>logout</button>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </div>
  )
}

export default App
