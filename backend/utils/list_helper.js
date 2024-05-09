const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs || blogs.length < 1) {
    return 0;
  }
  return blogs.reduce((sum, blog) => sum + blog?.likes || 0, 0);
};

module.exports = { dummy, totalLikes };
