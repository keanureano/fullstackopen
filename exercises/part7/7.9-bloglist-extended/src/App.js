import { useEffect } from "react";
import blogService from "./services/blogService";
import localStorageUserService from "./services/localStorageUser";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { setUser } from "./services/userSlice";
import { fetchBlogs } from "./services/blogSlice";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
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
    <div className="w-screen min-h-screen bg-slate-950 text-green-100">
      <div className="max-w-4xl mx-auto">
        <Notification />
        <Navbar />
        <main className="mt-4 py-4 px-4 bg-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
