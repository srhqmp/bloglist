const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs || blogs.length < 1) {
    return 0;
  }
  return blogs.reduce((sum, blog) => sum + blog?.likes || 0, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length < 1) {
    return null;
  }

  let favBlog = blogs[0];

  blogs.forEach((blog) => {
    if (!blog?.likes) {
      return;
    }
    if (blog.likes > favBlog.likes) {
      favBlog = blog;
    }
  });

  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length < 1) {
    return null;
  }

  const authors = [];

  blogs.forEach((blog) => {
    if (authors.indexOf(blog.author) === -1) {
      authors.push(blog.author);
    }
  });

  const authorsWithBlogs = authors.map((author) => {
    const blogsCount = blogs.reduce(
      (sum, curr) => (curr.author === author ? (sum += 1) : sum),
      0
    );
    return { author, blogs: blogsCount };
  });

  let authorWithMostBlogs = authorsWithBlogs[0];

  authorsWithBlogs.forEach((author) => {
    if (author.blogs > authorWithMostBlogs.blogs) {
      authorWithMostBlogs = author;
    }
  });

  return authorWithMostBlogs;
};

// TODO: Implement mostLikes function
// that receives an array of blogs as its parameter. 
// The function returns the author, whose blog posts have the largest amount of likes. 
// The return value also contains the total number of likes that the author has received:

// {
//   author: "Edsger W. Dijkstra",
//   likes: 17
// }

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
