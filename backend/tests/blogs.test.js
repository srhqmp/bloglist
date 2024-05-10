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

after(async () => {
  await mongoose.connection.close();
});