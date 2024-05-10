const blogsRouter = require("express").Router();

const Blog = require("../models/blog.js");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const newBlog = await blog.save();
  response.status(201).json(newBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findOneAndDelete(id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
