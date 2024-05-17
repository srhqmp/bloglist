import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const isAuthor = user && blog.user.id === user.id
  const [visible, setVisible] = useState(false)

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

  return (
    <div className="blog-card">
      <div className="blog-card-title">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>{' '}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div
        className="blog-card-content"
        style={{ display: visible ? '' : 'none' }}
      >
        <div>
          <em>{blog.url}</em>
        </div>
        <div>
          likes {blog.likes}{' '}
          <button onClick={() => handleLike(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {isAuthor && (
          <button onClick={() => handleDelete(blog.id)}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
