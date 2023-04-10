import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import localStorageUserService from "./services/localStorageUser";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localStorageUser = localStorageUserService.get();
    if (localStorageUser) {
      setUser(localStorageUser);
      blogService.setToken(localStorageUser.token);
    }
  }, []);

  return (
    <div>
      {user === null && <LoginForm setUser={setUser} />}
      {user !== null && <Blogs setUser={setUser} user={user} />}
    </div>
  );
};

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      localStorageUserService.set(user);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

const Blogs = ({ setUser, user }) => {
  const [blogs, setBlogs] = useState([]);

  const handleLogout = () => {
    setUser(null);
    localStorageUserService.clear();
  };

  useEffect(() => {
    const getAllBlogs = async () => {
      const response = await blogService.getAll();
      setBlogs(response);
    };

    getAllBlogs();
  }, []);

  return (
    <div>
      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>blogs</h2>
      <CreateBlogForm blogs={blogs} setBlogs={setBlogs} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const CreateBlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.create({ title, author, url });
      setBlogs([...blogs, response]);
    } catch (error) {
      console.error(error);
    }
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
