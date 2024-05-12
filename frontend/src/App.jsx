import { useState, useEffect } from "react";

import Blog from "./components/Blog.jsx";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await loginService.login({ username, password });

      setUser(response.data);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      // TODO: Display error notification
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
              setUser(null);
            }}
          >
            logout
          </button>
        </div>
      )}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
