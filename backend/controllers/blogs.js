const blogsRouter = require('express').Router()

const Blog = require('../models/blog.js')
const middleware = require('../utils/middleware.js')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate({
      path: 'comments.user',
      select: 'username name',
    })
    .exec()
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response
      .status(401)
      .json({ error: 'You need to sign-in to create a blog' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
    comments: body.comments,
  })
  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()

  const populatedBlog = await newBlog.populate('user', {
    username: 1,
    name: 1,
  })
  response.status(201).json(populatedBlog)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const id = request.params.id
    const user = request.user

    const blog = await Blog.findById(id)

    if (blog.user.toString() !== user.id.toString()) {
      return response
        .status(401)
        .json({ error: 'You are not authorize to delete this blog' })
    }

    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  }
)

blogsRouter.post(
  '/:id/comment',
  middleware.userExtractor,
  async (request, response) => {
    const id = request.params.id
    const user = request.user

    const comment = request.body.comment
    if (!comment)
      return response.status(400).json({ error: 'Comment must not be empty' })

    const blog = await Blog.findById(id)
    const commentObj = {
      content: comment,
      user: user.id,
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $push: { comments: commentObj } },
      { new: true, runValidators: true }
    )
      .populate('user', { username: 1, name: 1 })
      .populate({
        path: 'comments.user',
        select: 'username name',
      })
      .exec()

    if (!updatedBlog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    response.status(200).json(updatedBlog)
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .populate('user', { username: 1, name: 1 })
    .populate({
      path: 'comments.user',
      select: 'username name',
    })
    .exec()

  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
