import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import localStorageUserService from "./services/localStorageUser";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutButton";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Footer from "./components/Footer";


const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const notifRef = useRef();
  const blogFormRef = useRef();

  const showNotif = (message, type) => {
    notifRef.current.showNotif(message, type);
  };

  const createBlog = async (newBlog) => {
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

  return (
    <div>
      <Notification ref={notifRef} />
      {!user && (
        <div>
          <Togglable label="login">
            <LoginForm setUser={setUser} showNotif={showNotif} />
          </Togglable>
        </div>
      )}
      {user && (
        <div>
          <LogoutForm user={user} setUser={setUser} />
          <Togglable label="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} showNotif={showNotif} />
          </Togglable>
        </div>
      )}
      <Blogs
        blogs={blogs}
        setBlogs={setBlogs}
        showNotif={showNotif}
      />
      <Footer />
    </div>
  );
};

export default App;
