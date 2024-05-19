import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch, Link } from 'react-router-dom'
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
} from '@mui/material'

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
import { favoriteBlog, mostBlogs, mostLikes } from './utils/index.js'

const App = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const favBlog = favoriteBlog(blogs)
  const popularBlogger = mostLikes(blogs)
  const activeBlogger = mostBlogs(blogs)
  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  console.log(popularBlogger)

  useEffect(() => {
    dispatch(getAllBlogs())
    dispatch(getAllUsers())
    dispatch(updateUser())
  }, [dispatch])

  return (
    <div>
      <NavBar />
      <Notification />
      <Grid container gap={1}>
        <Grid item xs={12} md={8}>
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
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" color="secondary" gutterBottom>
            Quote of the week
          </Typography>
          <Card sx={{ height: 200, mb: 2 }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography variant="body2">
                You have power over your mind—not outside events. Realize this,
                and you will find strength.
              </Typography>
              <Typography variant="caption">- Marcus Aurelius</Typography>
            </CardContent>
          </Card>
          <Typography variant="h6" color="secondary" gutterBottom>
            Favorite Blog
          </Typography>
          <Card sx={{ height: 120, mb: 2 }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              {favBlog ? (
                <>
                  <Typography variant="body2">
                    {`${favBlog.title} by ${favBlog.author} with ${favBlog.likes} likes`}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/blogs/${favBlog.id}`}
                    size="small"
                  >
                    View here
                  </Button>
                </>
              ) : (
                'TBA'
              )}
            </CardContent>
          </Card>
          <Typography variant="h6" color="secondary" gutterBottom>
            Top Bloggers
          </Typography>
          <Card sx={{ height: 180, mb: 2 }}>
            <CardContent>
              <Typography color="secondary" variant="caption" gutterBottom>
                Popular Blogger:
              </Typography>
              {popularBlogger ? (
                <Typography variant="body2">{`${popularBlogger.author} with total of ${popularBlogger.likes} likes`}</Typography>
              ) : (
                'TBA'
              )}
              <Divider sx={{ my: 2 }} />
              <Typography color="secondary" variant="caption" gutterBottom>
                Most Active Blogger:
              </Typography>
              {activeBlogger ? (
                <Typography variant="body2">{`${activeBlogger.author} with total of ${activeBlogger.blogs} written blogs`}</Typography>
              ) : (
                'TBA'
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default App
