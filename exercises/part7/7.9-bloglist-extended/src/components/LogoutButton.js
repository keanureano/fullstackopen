import localStorageUserService from "../services/localStorageUser";

const LogoutForm = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
    localStorageUserService.clear();
  };
  return (
    <div>
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default LogoutForm;
