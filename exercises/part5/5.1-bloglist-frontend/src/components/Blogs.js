import { useEffect } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";

const Blogs = ({ blogs, setBlogs }) => {
  useEffect(() => {
    const getAllBlogs = async () => {
      const response = await blogService.getAll();
      const sortedBlogs = [...response].sort(
        (current, next) => next.likes - current.likes
      );
      setBlogs(sortedBlogs);
    };

    getAllBlogs();
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
