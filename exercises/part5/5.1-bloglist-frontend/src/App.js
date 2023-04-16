import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import localStorageUserService from "./services/localStorageUser";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutButton";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const notifRef = useRef();
  const blogFormRef = useRef();

  const showNotif = (message, type) => {
    notifRef.current.showNotif(message, type);
  };

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    const returnedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(returnedBlog));
    return returnedBlog;
  };

  useEffect(() => {
    const localStorageUser = localStorageUserService.get();
    if (localStorageUser) {
      setUser(localStorageUser);
      blogService.setToken(localStorageUser.token);
    }
  }, []);

  if (!user) {
    return (
      <div>
        <Notification ref={notifRef} />
        <Togglable label="login">
          <LoginForm setUser={setUser} showNotif={showNotif} />
        </Togglable>
      </div>
    );
  }

  return (
    <div>
      <Notification ref={notifRef} />
      <LogoutForm user={user} setUser={setUser} />
      <Togglable label="new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} showNotif={showNotif} />
      </Togglable>
      <Blogs
        setUser={setUser}
        user={user}
        blogs={blogs}
        setBlogs={setBlogs}
        showNotif={showNotif}
      />
    </div>
  );
};

export default App;
