const { test, after, before } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");

const Blog = require("../models/blog.js");

const helper = require("./test_helper.js");
const app = require("../app.js");
const api = supertest(app);

before(async () => {
  await Blog.deleteMany({});

  await Promise.all(
    helper.initialBlogs.map(async (p) => {
      const blog = new Blog(p);
      await blog.save();
    })
  );
});

test("blogs api returns json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("verify that blog returns 'id' as unique identifier", async () => {
  const blogs = await helper.blogsInDb();
  const keys = Object.keys(blogs[0]);

  assert.strictEqual(keys.includes("id"), true);
  assert(!keys.includes("_id"));
});

test("a blog can be created", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blog = {
    title: "My New Blog",
    author: "Sarah",
  };

  await api.post("/api/blogs").send(blog).expect(201);

  const blogsAtEnd = await helper.blogsInDb();
  const titles = blogsAtEnd.map((b) => b.title);

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);
  assert.strictEqual(titles.includes("My New Blog"), true);
});

test("default likes is 0", async () => {
  const blog = {
    title: "Blog with no likes",
    author: "Sarah",
  };

  const response = await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("server will throw error 400 for missing title or url", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blog = {
    title: "A Day In My Life",
    author: "Sarah",
    url: "http://google.com",
  };

  //   blog with no title and url
  await api
    .post("/api/blogs")
    .send({
      author: blog.author,
    })
    .expect(400);

  // blog with no title
  await api
    .post("/api/blogs")
    .send({
      author: blog.author,
      url: blog.url,
    })
    .expect(400);

  // blog with no url
  await api
    .post("/api/blogs")
    .send({
      title: blog.title,
      author: blog.author,
    })
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
});

test.only("deletion of a blog", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  assert(!blogsAtEnd.find((blog) => blog.id === blogToDelete.id));
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
});

after(async () => {
  await mongoose.connection.close();
});

// npm test -- --test-only
