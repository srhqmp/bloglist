import { useState } from "react";

const Blog = ({ blog, isAuthor, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="blog-card">
      <div className="blog-card-title">
        {blog.title} {blog.author}{" "}
        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </div>
      <div
        className="blog-card-content"
        style={{ display: visible ? "" : "none" }}
      >
        <div>
          <em>{blog.url}</em>
        </div>
        <div>
          likes {blog.likes}{" "}
          <button onClick={() => handleLike(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {isAuthor && (
          <button onClick={() => handleDelete(blog.id)}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
