import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthorView = () => {
  const { authorId } = useParams();
  const blogs = useSelector((state) => state.blogs.blogs);

  const authorBlogs = blogs.filter((blog) => blog.author === authorId);

  return (
    <div>
      <h2>{authorId}</h2>
      <h3>Published Blogs</h3>
      <ul>
        {authorBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorView;
