import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Togglable from "./Togglable";
import LoginForm from "./LoginForm";
import LogoutForm from "./LogoutButton";
import BlogForm from "./BlogForm";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  return (
    <nav className="flex justify-between border-b-2 border-green-300 p-4">
      <div className="flex gap-4 items-center">
        <Link
          className="bg-green-400 text-green-950 py-1 px-3 rounded hover:bg-green-500"
          to="/home"
        >
          blogs
        </Link>

        <Link
          className="bg-green-400 text-green-950 py-1 px-3 rounded hover:bg-green-500"
          to="/home/author"
        >
          authors
        </Link>

        {user && (
          <Togglable label="new blog">
            <BlogForm />
          </Togglable>
        )}
      </div>

      {user && <LogoutForm />}

      {!user && (
        <Togglable label="login">
          <LoginForm />
        </Togglable>
      )}
    </nav>
  );
};

export default Navbar;
