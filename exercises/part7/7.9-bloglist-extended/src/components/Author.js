import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Author = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  console.log(blogs);
  const authors = [...new Set(blogs.map((blog) => blog.author))];

  return (
    <div>
      <h2>Authors</h2>
      <ul>
        {authors.map((author) => (
          <li key={author}>
            <Link to={`${author}`}>{author}</Link>
          </li>
        ))}
        <Outlet />
      </ul>
    </div>
  );
};

export default Author;
