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

  const capitalize = ([first, ...rest]) => {
    return `${first.toUpperCase()}${rest.join("")}`;
  };

  return (
    <div className="flex gap-4 items-center">
      <p>Welcome, {capitalize(user.username)}</p>
      <button
        className="underline text-green-400 hover:text-green-300"
        onClick={handleLogout}
      >
        logout?
      </button>
    </div>
  );
};

export default LogoutForm;
