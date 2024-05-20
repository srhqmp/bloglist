import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Card, CardHeader, Typography, Box } from '@mui/material'
import { Face as FaceIcon, Schedule as ScheduleIcon } from '@mui/icons-material'

import { createBlog } from '../reducers/blogReducer.js'

import { formatTimeAgo } from '../utils/index.js'

import Togglable from '../components/Togglable.jsx'
import BlogForm from '../components/BlogForm.jsx'

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
    <Container>
      <Typography variant="h3" color="secondary" sx={{ mb: 2 }}>
        Blogs
      </Typography>
      <BlogFormButton />
      {sortedBlogs.map((blog) => (
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          <Card>
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  color="secondary"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  {blog.title}
                </Typography>
              }
              subheader={
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                    variant="caption"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <FaceIcon sx={{ fontSize: 15 }} />
                    {blog.author}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <ScheduleIcon sx={{ fontSize: 15 }} />
                    {formatTimeAgo(blog.createdAt)}
                  </Typography>
                </Box>
              }
            />
          </Card>
        </Link>
      ))}
    </Container>
  )
}

export default BlogsPage
