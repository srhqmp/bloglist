const express = require("express");
const app = express();
const cors = require("cors");

const middleware = require("./utils/middleware.js");
const blogsRouter = require("./controllers/blogs.js");

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
