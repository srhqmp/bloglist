import { useState, forwardRef, useImperativeHandle } from "react";

const BlogForm = forwardRef(({ handleSubmit }, refs) => {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const resetForm = () => {
    setBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  useImperativeHandle(refs, () => {
    return { resetForm };
  });

  const handleNewBlog = (event) => {
    event.preventDefault();
    handleSubmit(blog);
  };

  return (
    <div>
      <h2>create new</h2>
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
    </div>
  );
});

BlogForm.displayName = "BlogForm";

export default BlogForm;
