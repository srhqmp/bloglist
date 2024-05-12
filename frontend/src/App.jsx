import { useState, useEffect } from "react";

import Blog from "./components/Blog.jsx";
import Notification from "./components/Notification.jsx";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null); // {message: "", variant: ""}

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

  const handleError = (err) => {
    console.error(err);
    displayNotification(err.response.data.error, "error");
  };

  const displayNotification = (message, variant) => {
    setNotification({ message, variant });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const data = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(data));
      setUser(data);
      blogService.setToken(data.token);
      setUsername("");
      setPassword("");
      displayNotification(`Welcome back ${data.name}!`, "success");
    } catch (err) {
      handleError(err);
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
      displayNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "success"
      );
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
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
