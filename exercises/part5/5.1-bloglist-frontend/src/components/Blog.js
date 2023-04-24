import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, showNotif }) => {
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
    try {
      const confirmDelete = window.confirm(
        `Remove blog ${blog.title} by ${blog.author}`
      );
      if (!confirmDelete) {
        return;
      }
      const response = await blogService.remove(blog);
      const status = response.status === 204;
      setIsDeleted(status);
      showNotif("successfully deleted", "success");
    } catch (error) {
      const errorMessage = error.response.data.error;
      showNotif(errorMessage, "error");
    }
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
      <span className="blog-title">{blog.title} </span>
      <span className="blog-author">{blog.author}</span>
    </div>
  );
};

const BlogBody = ({ blog, likes, handleLike, handleDelete }) => {
  return (
    <div>
      <a className="blog-url" href={blog.url}>
        {blog.url}
      </a>
      <div>
        likes <span className="blog-likes">{likes}</span>
        <button className="blog-like-button" onClick={handleLike}>
          like
        </button>
      </div>
      <div>{blog.user.username}</div>
      <button className="blog-delete-button" onClick={handleDelete}>
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
