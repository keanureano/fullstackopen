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
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (!confirmDelete) {
      return;
    }
    const response = await blogService.remove(blog);
    const status = response.status === 204;
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
        <BlogBody
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
      <div className="blog-title">{blog.title}</div>
      <div className="blog-author">{blog.author}</div>
    </div>
  );
};

const BlogBody = ({ blog, likes, handleLike, handleDelete }) => {
  return (
    <div>
      <a className="blog-url" href={blog.url}>
        {blog.url}
      </a>
      <div className="blog-likes">
        likes {likes}
        <button className="blog-like-btn" onClick={handleLike}>
          like
        </button>
      </div>
      <div>{blog.user.username}</div>
      <button className="blog-delete-btn" onClick={handleDelete}>
        delete
      </button>
    </div>
  );
};

const ToggleButton = ({ toggleDetails, details }) => {
  const buttonLabel = details ? "hide" : "show";
  return (
    <button className="blog-toggle-btn" onClick={toggleDetails}>
      {buttonLabel}
    </button>
  );
};

export default Blog;