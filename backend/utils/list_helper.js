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

module.exports = { dummy, totalLikes, favoriteBlog };
