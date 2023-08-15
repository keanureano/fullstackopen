import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Author = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  const authors = [...new Set(blogs.map((blog) => blog.author))];

  return (
    <div>
      <h1 className="text-4xl mb-4">Authors</h1>
      <ul className="space-y-1 pb-8">
        {authors.map((author) => (
          <li key={author}>
            <Link
              className="underline text-green-300 hover:text-green-500"
              to={`${author}`}
            >
              {author}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default Author;
