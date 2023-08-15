import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../services/notificationSlice";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  if (!notification) {
    return null;
  }

  setTimeout(() => {
    dispatch(hideNotification());
  }, 10000);

  return (
    <div
      className={`absolute opacity-80 top-0 left-1/2 -translate-x-1/2 translate-y-2 border-2 py-2 px-6 rounded
                ${
                  notification.type === "success"
                    ? "text-green-400 bg-green-950 border-green-400"
                    : "text-yellow-400 bg-yellow-950 border-yellow-400"
                }`}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
