import Togglable from "./Togglable";

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <Togglable buttonLabel="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </Togglable>
  );
};

export default LoginForm;
