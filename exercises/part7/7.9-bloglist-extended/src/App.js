import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogService";
import localStorageUserService from "./services/localStorageUser";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutButton";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./services/userSlice";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageUser = localStorageUserService.get();
    if (localStorageUser) {
      dispatch(setUser(localStorageUser));
      blogService.setToken(localStorageUser.token);
    }
  }, []);

  return (
    <div>
      <Notification />
      {!user && (
        <div>
          <Togglable label="login">
            <LoginForm />
          </Togglable>
        </div>
      )}
      {user && (
        <div>
          <LogoutForm />
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
