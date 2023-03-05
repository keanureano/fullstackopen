const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  return blogs
    .map((blog) => blog.likes)
    .reduce((total, current) => total + current, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  return blogs.reduce((mostLikedBlog, blog) => {
    if (mostLikedBlog.likes < blog.likes) {
      return blog;
    }
    return mostLikedBlog;
  }, blogs[0]);
};

module.exports = { dummy, totalLikes, favoriteBlog };
