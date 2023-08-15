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

  useEffect(() => {
    const localStorageUser = localStorageUserService.get();
    if (localStorageUser) {
      setUser(localStorageUser);
      blogService.setToken(localStorageUser.token);
    }
  }, []);

  return (
    <div>
      <Notification />
      {!user && (
        <div>
          <Togglable label="login">
            <LoginForm setUser={setUser} />
          </Togglable>
        </div>
      )}
      {user && (
        <div>
          <LogoutForm user={user} setUser={setUser} />
          <Togglable label="new blog">
            <BlogForm />
          </Togglable>
        </div>
      )}
      <Blogs />
      <Footer />
    </div>
  );
};

export default App;
