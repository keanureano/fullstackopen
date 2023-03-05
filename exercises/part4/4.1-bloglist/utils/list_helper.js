const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const getTotalLikes = (total, blog) => total + blog.likes;
  return blogs.reduce(getTotalLikes, 0);
};

module.exports = { dummy, totalLikes };

