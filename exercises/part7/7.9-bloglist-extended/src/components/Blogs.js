import Blog from "./Blog";
import { useSelector } from "react-redux";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs.blogs);

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
