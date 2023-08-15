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
    <div className="border-2 border-slate-800 p-4 mb-2">
      <BlogHeader blog={blog} />
      <ToggleButton toggleDetails={toggleDetails} details={details} />
      {details && <BlogBody blog={blog} />}
    </div>
  );
};

const BlogHeader = ({ blog }) => {
  return (
    <div>
      <div className="text-2xl hover:text-green-500">
        <Link to={`blog/${blog.id}`}>{blog.title}</Link>
      </div>
      <div className="mb-4 hover:text-green-500">
        <Link to={`author/${blog.author}`}>- {blog.author}</Link>
      </div>
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
    <div className="mt-4">
      <a className="hover:underline" href={blog.url}>
        {blog.url}
      </a>
      <div className="mb-4">{blog.user.username}</div>
      <div className="mb-4">👍 {blog.likes}</div>
      <button className="underline text-green-300 hover:text-green-500 mr-4" onClick={handleLike}>
        like?
      </button>
      <button className="underline text-green-300 hover:text-green-500" onClick={handleDelete}>
        delete?
      </button>
    </div>
  );
};

const ToggleButton = ({ toggleDetails, details }) => {
  const buttonLabel = details ? "hide" : "show more";
  return (
    <button
      className="bg-green-400 text-green-950 px-2 rounded hover:bg-green-500"
      onClick={toggleDetails}
    >
      {buttonLabel}
    </button>
  );
};

export default Blog;
