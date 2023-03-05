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
  const mostLikedBlog = blogs.reduce((largestBlog, blog) => {
    if (largestBlog.likes < blog.likes) {
      return blog;
    }
    return largestBlog;
  }, blogs[0]);
  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
};

module.exports = { dummy, totalLikes, favoriteBlog };
