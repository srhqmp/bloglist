import { useState, useEffect } from "react";

import Blog from "./components/Blog.jsx";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = window.localStorage.getItem("loggedBlogUser");
    if (user) {
      const userJSON = JSON.parse(user);
      setUser(userJSON);
      blogService.setToken(userJSON.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const data = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(data));
      setUser(data);
      blogService.setToken(data.token);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      // TODO: Display error notification
    }
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.create(blog);
      setBlogs((curr) => curr.concat(newBlog));
      setBlog({
        title: "",
        author: "",
        url: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {!user && (
        <>
          <h2>login to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div>
              password
              <input
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </>
      )}

      <h2>blogs</h2>
      {user && (
        <div>
          {user.name} logged in{" "}
          <button
            onClick={() => {
              window.localStorage.removeItem("loggedBlogUser");
              setUser(null);
            }}
          >
            logout
          </button>
        </div>
      )}
      {user && (
        <>
          <h2>create nw</h2>
          <form onSubmit={handleNewBlog}>
            <div>
              title:{" "}
              <input
                name="title"
                value={blog.title}
                onChange={(event) =>
                  setBlog((curr) => ({ ...curr, title: event.target.value }))
                }
              />
            </div>
            <div>
              author:{" "}
              <input
                name="author"
                value={blog.author}
                onChange={(event) =>
                  setBlog((curr) => ({ ...curr, author: event.target.value }))
                }
              />
            </div>
            <div>
              url:{" "}
              <input
                name="url"
                value={blog.url}
                onChange={(event) =>
                  setBlog((curr) => ({ ...curr, url: event.target.value }))
                }
              />
            </div>
            <button type="submit">create</button>
          </form>
        </>
      )}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
