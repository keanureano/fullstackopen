import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [details, setDetails] = useState(false);

  const toggleDetails = () => {
    setDetails(!details);
  };

  return (
    <div className="blog">
      <BlogHeader blog={blog} />
      <ToggleButton toggleDetails={toggleDetails} details={details} />
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
  const [likes, setLikes] = useState(blog.likes);

  const handleLikeButton = async () => {
    const addedLikeBlog = {
      ...blog,
      likes: likes + 1,
      user: blog.user.id,
    };
    const response = await blogService.put(addedLikeBlog);
    setLikes(response.likes);
  };

  return (
    <div>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {likes}
        <button onClick={handleLikeButton}>like</button>
      </div>
      <div>{blog.user.username}</div>
    </div>
  );
};

const ToggleButton = ({ toggleDetails, details }) => {
  const buttonLabel = details ? "hide" : "show";
  return <button onClick={toggleDetails}>{buttonLabel}</button>;
};

export default Blog;
