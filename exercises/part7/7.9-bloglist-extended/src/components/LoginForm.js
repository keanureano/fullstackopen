import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogService";
import localStorageUserService from "../services/localStorageUser";
import { useDispatch } from "react-redux";
import { showNotification } from "../services/notificationSlice";
import { setUser } from "../services/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      localStorageUserService.set(user);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
      const message = "sucessfully logged in";
      dispatch(showNotification({ message, type: "success" }));
    } catch (error) {
      const message = error.response.data.error;
      dispatch(showNotification({ message, type: "error" }));
    }
  };

  return (
    <div className="absolute">
      <form onSubmit={handleLogin}>
        <div>
          <div>username</div>
          <input
            className="text-green-950"
            type="text"
            value={username}
            id="login-username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <div>password</div>
          <input
            className="text-green-950"
            type="password"
            value={password}
            id="login-password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          className="underline text-green-400 hover:text-green-300"
          id="login-submit"
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
