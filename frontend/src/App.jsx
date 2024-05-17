import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import Togglable from './components/Togglable.jsx'

import BlogForm from './components/BlogForm.jsx'

import { getAllBlogs, createBlog, likeBlog } from './reducers/blogReducer.js'
import { logoutUser, updateUser } from './reducers/userReducer.js'
import { getAllUsers } from './reducers/usersReducer.js'

const BlogFormButton = () => {
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
        <Togglable buttonLabel="create new" ref={blogRef}>
          <BlogForm handleSubmit={handleNewBlog} ref={blogFormRef} />
        </Togglable>
      )}
    </div>
  )
}

const BlogsPage = () => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b?.likes - a?.likes)

  return (
    <div>
      <BlogFormButton />
      {sortedBlogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

const BlogPage = ({ blog }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes{' '}
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <h3>comments</h3>
      {blog.comments.length ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={`${comment}-${index}`}>{comment}</li>
          ))}
        </ul>
      ) : (
        <div>No comments at this moment</div>
      )}
    </div>
  )
}

const UserPage = ({ user }) => {
  if (!user) return <div>User Not Found</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

const UsersPage = () => {
  const users = useSelector((state) => state.users)

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
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  )
}

const NavigationMenu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  return (
    <div className="nav-menu">
      <Link to="/">blogs</Link> <Link to="/users">users</Link>{' '}
      {user && (
        <span>
          {user.name} logged in{' '}
          <button onClick={() => dispatch(logoutUser())}>logout</button>
        </span>
      )}
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  useEffect(() => {
    dispatch(getAllBlogs())
    dispatch(getAllUsers())
    dispatch(updateUser())
  }, [dispatch])

  return (
    <div>
      <NavigationMenu />
      <h2>blog app</h2>
      <Notification />
      {!user && (
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      )}
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route
          path="/users/:id"
          element={
            <UserPage
              user={
                users &&
                userMatch &&
                users.find((u) => u.id === userMatch.params.id)
              }
            />
          }
        />
        <Route path="/" element={<BlogsPage />} />
        <Route
          path="/blogs/:id"
          element={
            <BlogPage
              blog={
                blogs &&
                blogMatch &&
                blogs.find((b) => b.id === blogMatch.params.id)
              }
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
