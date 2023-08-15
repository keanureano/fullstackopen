import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Author = () => {
  const { author } = useParams();
  const blogs = useSelector((state) => state.blogs.blogs);
  console.log(blogs);

  const authorBlogs = blogs.filter((blog) => blog.author === author);

  return (
    <div>
      <h2>{author}</h2>
      <h3>Published Blogs</h3>
      <ul>
        {authorBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Author;
