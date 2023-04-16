import { useState } from "react";

const Blog = ({ blog }) => {
  const [details, setDetails] = useState(false);
  const toggleDetails = () => {
    setDetails(!details);
  };
  const toggleDetailsLabel = details ? "hide" : "show";
  return (
    <div className="blog">
      <BlogHeader blog={blog} />
      <button onClick={toggleDetails}>{toggleDetailsLabel}</button>
      {details && <BlogDetails blog={blog} />}
    </div>
  );
};

const BlogHeader = ({ blog }) => {
  return (
    <div>
      {blog.title} {blog.author}
    </div>
  );
};

const BlogDetails = ({ blog }) => {
  return (
    <div>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}
        <button>like</button>
      </div>
      <div>{blog.user.username}</div>
    </div>
  );
};

export default Blog;
