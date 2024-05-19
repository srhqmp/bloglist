import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'

import Notification from './components/Notification.jsx'
import NavBar from './components/NavBar.jsx'
import BlogsPage from './pages/BlogsPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import UsersPage from './pages/UsersPage.jsx'
import UserPage from './pages/UserPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

import { getAllBlogs } from './reducers/blogReducer.js'
import { updateUser } from './reducers/userReducer.js'
import { getAllUsers } from './reducers/usersReducer.js'

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
