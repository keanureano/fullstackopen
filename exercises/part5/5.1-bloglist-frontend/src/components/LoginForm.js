import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import localStorageUserService from "../services/localStorageUser";

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
      console.log(error);
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

export default LoginForm;
