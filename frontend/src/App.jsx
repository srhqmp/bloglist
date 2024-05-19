import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

import Notification from './components/Notification.jsx'
import NavBar from './components/NavBar.jsx'
import BlogsPage from './pages/BlogsPage.jsx'
import BlogPage from './pages/BlogPage.jsx'

import { getAllBlogs } from './reducers/blogReducer.js'
import { updateUser } from './reducers/userReducer.js'
import { getAllUsers } from './reducers/usersReducer.js'
import LoginPage from './pages/LoginPage.jsx'

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

const App = () => {
  const dispatch = useDispatch()
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
      <NavBar />
      <Notification />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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
