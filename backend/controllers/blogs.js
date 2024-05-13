const blogsRouter = require("express").Router();

const Blog = require("../models/blog.js");
const middleware = require("../utils/middleware.js");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!user) {
    return response
      .status(401)
      .json({ error: "You need to sign-in to create a blog" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });
  const newBlog = await blog.save();
  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();

  const populatedBlog = await newBlog.populate("user", {
    username: 1,
    name: 1,
  });
  response.status(201).json(populatedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const id = request.params.id;
    const user = request.user;

    const blog = await Blog.findById(id);

    if (blog.user.toString() !== user.id.toString()) {
      return response
        .status(401)
        .json({ error: "You are not authorize to delete this blog" });
    }

    await Blog.findOneAndDelete(id);
    response.status(204).end();
  }
);

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
  }).populate("user", { username: 1, name: 1 });
  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
