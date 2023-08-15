import { useDispatch, useSelector } from "react-redux";
import localStorageUserService from "../services/localStorageUser";
import { clearUser } from "../services/userSlice";

const LogoutForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(clearUser());
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
