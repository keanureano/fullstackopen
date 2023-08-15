import Blog from "./Blog";
import { useSelector } from "react-redux";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs.blogs);

  return (
    <div>
      <h1 className="text-4xl mb-4">blogs</h1>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
