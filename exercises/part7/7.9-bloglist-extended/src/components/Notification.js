import { useState, useRef, forwardRef, useImperativeHandle } from "react";

import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../services/notificationSlice";

const Notification = forwardRef(() => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  if (!notification) {
    return null;
  }

  setTimeout(() => {
    dispatch(hideNotification());
  }, 5000);

  return (
    <div className={`notif notif-${notification.type}`}>
      {notification.message}
    </div>
  );
});

export default Notification;
