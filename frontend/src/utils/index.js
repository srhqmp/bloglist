import { formatDistanceToNow } from 'date-fns'

export const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length < 1) {
    return null
  }

  let favBlog = blogs[0]

  blogs.forEach((blog) => {
    if (!blog?.likes) {
      return
    }
    if (blog.likes > favBlog.likes) {
      favBlog = blog
    }
  })

  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
    id: favBlog.id,
  }
}

const getAuthors = (blogs) => {
  if (!blogs || blogs.length < 1) {
    return []
  }
  const authors = []
  blogs.forEach((blog) => {
    if (authors.indexOf(blog.author) === -1) {
      authors.push(blog.author)
    }
  })
  return authors
}

export const mostBlogs = (blogs) => {
  if (!blogs || blogs.length < 1) {
    return null
  }

  const authors = getAuthors(blogs)
  const authorsWithBlogs = authors.map((name) => {
    const blogsCount = blogs.reduce(
      (sum, curr) => (curr.author === name ? (sum += 1) : sum),
      0
    )
    return { author: name, blogs: blogsCount }
  })

  let authorWithMostBlogs = authorsWithBlogs[0]
  authorsWithBlogs.forEach((author) => {
    if (author.blogs > authorWithMostBlogs.blogs) {
      authorWithMostBlogs = author
    }
  })

  return authorWithMostBlogs
}

export const mostLikes = (blogs) => {
  if (!blogs || blogs.length < 1) {
    return null
  }

  const authors = getAuthors(blogs)
  const authorsWithLikes = authors.map((name) => {
    const likes = blogs.reduce(
      (sum, curr) => (curr.author === name ? sum + curr.likes : sum),
      0
    )
    return { author: name, likes }
  })

  let mostLikedAuthor = authorsWithLikes[0]
  authorsWithLikes.forEach((author) => {
    if (author.likes > mostLikedAuthor.likes) {
      mostLikedAuthor = author
    }
  })

  return mostLikedAuthor
}

export const formatTimeAgo = (timestamp) => {
  console.log(timestamp)
  if (!timestamp) return ''
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
}
