import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import localStorageUserService from "./services/localStorageUser";

const App = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotif = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  useEffect(() => {
    const localStorageUser = localStorageUserService.get();
    if (localStorageUser) {
      setUser(localStorageUser);
      blogService.setToken(localStorageUser.token);
    }
  }, []);

  return (
    <div>
      <Notification notification={notification} />
      {user === null && <LoginForm setUser={setUser} showNotif={showNotif} />}
      {user !== null && (
        <Blogs setUser={setUser} user={user} showNotif={showNotif} />
      )}
    </div>
  );
};

const LoginForm = ({ setUser, showNotif }) => {
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
      const successMessage = "sucessfully logged in";
      showNotif(successMessage, "success");
    } catch (error) {
      const errorMessage = error.response.data.error;
      showNotif(errorMessage, "error");
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

const Blogs = ({ setUser, user, showNotif }) => {
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
      <CreateBlogForm blogs={blogs} setBlogs={setBlogs} showNotif={showNotif} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const CreateBlogForm = ({ blogs, setBlogs, showNotif }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.create({ title, author, url });
      setBlogs([...blogs, response]);
      const successMessage = `a new blog ${response.title} by ${response.author}`;
      showNotif(successMessage, "success");
    } catch (error) {
      const errorMessage = error.response.data.error;
      showNotif(errorMessage, "error");
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

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }
  return (
    <div className={`notif notif-${notification.type}`}>
      {notification.message}
    </div>
  );
};

export default App;
