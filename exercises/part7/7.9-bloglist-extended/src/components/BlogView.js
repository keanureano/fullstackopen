import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogView = () => {
  const { blogId } = useParams();
  const blogs = useSelector((state) => state.blogs.blogs);
  const blog = blogs.find((blog) => blog.id === blogId);

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <div>
      <Blog blog={blog} />
    </div>
  );
};

export default BlogView;
