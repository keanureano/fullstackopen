import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogService";
import localStorageUserService from "./services/localStorageUser";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutButton";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./services/userSlice";
import { fetchBlogs } from "./services/blogSlice";
import { Outlet } from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageUser = localStorageUserService.get();
    if (localStorageUser) {
      dispatch(setUser(localStorageUser));
      blogService.setToken(localStorageUser.token);
    }
    dispatch(fetchBlogs());
  }, [dispatch]);

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
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
