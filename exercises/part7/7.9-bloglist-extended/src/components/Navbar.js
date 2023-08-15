import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <Link to="/home">blogs</Link>
      </div>
      <div>
        <Link to="/home/author">authors</Link>
      </div>
    </nav>
  );
};

export default Navbar;
