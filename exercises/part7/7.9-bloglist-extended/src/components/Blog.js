import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../services/notificationSlice";
import { deleteBlog, fetchBlogs, updateBlog } from "../services/blogSlice";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const [details, setDetails] = useState(false);

  const toggleDetails = () => {
    setDetails(!details);
  };

  return (
    <div className="blog">
      <BlogHeader blog={blog} />
      <ToggleButton toggleDetails={toggleDetails} details={details} />
      {details && <BlogBody blog={blog} />}
    </div>
  );
};

const BlogHeader = ({ blog }) => {
  return (
    <div>
      <div className="blog-title">{blog.title}</div>
      <Link className="blog-author" to={`author/${blog.author}`}>
        {blog.author}
      </Link>
    </div>
  );
};

const BlogBody = ({ blog }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    dispatch(updateBlog(updatedBlog))
      .then(() => {
        dispatch(fetchBlogs());
      })
      .catch((error) => {
        const message = error.response.data.error;
        dispatch(showNotification({ message, type: "error" }));
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );

    if (!confirmDelete) {
      return;
    }

    dispatch(deleteBlog(blog))
      .then(() => {
        dispatch(fetchBlogs());
        dispatch(
          showNotification({ message: "Blog deleted!", type: "success" })
        );
      })
      .catch((error) => {
        const message = error.response.data.error;
        dispatch(showNotification({ message, type: "error" }));
      });
  };

  return (
    <div>
      <a className="blog-url" href={blog.url}>
        {blog.url}
      </a>
      <div>
        likes <span className="blog-likes">{blog.likes}</span>
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
