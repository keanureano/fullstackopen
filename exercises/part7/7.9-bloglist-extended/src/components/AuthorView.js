import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthorView = () => {
  const { authorId } = useParams();
  const blogs = useSelector((state) => state.blogs.blogs);

  const authorBlogs = blogs.filter((blog) => blog.author === authorId);

  return (
    <div className="border-2 border-slate-800 p-4">
      <h2 className="text-2xl mb-2">{authorId}</h2>
      <ul>
        {authorBlogs.map((blog) => (
          <li
            key={blog.id}
          >
            - {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorView;
