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
  const mostLikedBlog = blogs.reduce((largestBlog, currentBlog) => {
    if (largestBlog.likes < currentBlog.likes) {
      return currentBlog;
    }
    return largestBlog;
  }, blogs[0]);
  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  let authorToBlogCount = {};
  blogs.forEach((blog) => {
    if (blog.author in authorToBlogCount) {
      authorToBlogCount[blog.author] += 1;
    } else {
      authorToBlogCount[blog.author] = 1;
    }
  });
  const mostAmountBlog = Object.keys(authorToBlogCount).reduce(
    (mostAmount, key) => {
      const currentAmount = {
        author: key,
        blogs: authorToBlogCount[key],
      };
      return mostAmount.blogs > currentAmount.blogs
        ? mostAmount
        : currentAmount;
    },
    0
  );
  return mostAmountBlog;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
