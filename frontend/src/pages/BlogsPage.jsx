import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container } from '@mui/material'

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
        <div key={blog.id} className="blog-card">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </Container>
  )
}

export default BlogsPage
