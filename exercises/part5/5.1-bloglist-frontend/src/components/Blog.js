import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [details, setDetails] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handleLike = async () => {
    const addedLikeBlog = {
      ...blog,
      likes: likes + 1,
      user: blog.user.id,
    };
    const response = await blogService.put(addedLikeBlog);
    setLikes(response.likes);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (!confirmDelete) {
      return;
    }
    const response = await blogService.remove(blog);
    const status = response.status === 204;
    console.log(status);
    setIsDeleted(status);
  };

  const toggleDetails = () => {
    setDetails(!details);
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="blog">
      <BlogHeader blog={blog} />
      <ToggleButton toggleDetails={toggleDetails} details={details} />
      {details && (
        <BlogDetails
          blog={blog}
          likes={likes}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      )}
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

const BlogDetails = ({ blog, likes, handleLike, handleDelete }) => {
  return (
    <div>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {likes}
        <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.user.username}</div>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

const ToggleButton = ({ toggleDetails, details }) => {
  const buttonLabel = details ? "hide" : "show";
  return <button onClick={toggleDetails}>{buttonLabel}</button>;
};

export default Blog;
