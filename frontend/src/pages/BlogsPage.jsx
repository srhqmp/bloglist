import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Card, CardHeader, Typography } from '@mui/material'
import { Face as FaceIcon, Title as TitleIcon } from '@mui/icons-material'

import { createBlog } from '../reducers/blogReducer.js'

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
      <BlogFormButton />
      {sortedBlogs.map((blog) => (
        <Card key={blog.id} sx={{ mb: 1 }}>
          <CardHeader
            title={
              <Typography
                component={Link}
                to={`/blogs/${blog.id}`}
                color="secondary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  textDecoration: 'none',
                }}
              >
                <TitleIcon sx={{ fontSize: 15 }} /> {blog.title}
              </Typography>
            }
            subheader={
              <>
                <Typography
                  variant="caption"
                  sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  <FaceIcon sx={{ fontSize: 15 }} />
                  {blog.author}
                </Typography>
              </>
            }
          />
        </Card>
      ))}
    </Container>
  )
}

export default BlogsPage
