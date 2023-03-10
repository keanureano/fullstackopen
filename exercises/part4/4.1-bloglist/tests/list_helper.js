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

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  let authorToLikeCount = {};
  blogs.forEach((blog) => {
    if (blog.author in authorToLikeCount) {
      authorToLikeCount[blog.author] += blog.likes;
    } else {
      authorToLikeCount[blog.author] = blog.likes;
    }
  });
  const mostLikesBlog = Object.keys(authorToLikeCount).reduce(
    (mostLikes, key) => {
      const currentLikes = {
        author: key,
        likes: authorToLikeCount[key],
      };
      return mostLikes.likes > currentLikes.likes ? mostLikes : currentLikes;
    },
    0
  );
  return mostLikesBlog;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
