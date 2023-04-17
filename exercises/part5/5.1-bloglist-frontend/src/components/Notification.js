import { useState, useRef, forwardRef, useImperativeHandle } from "react";

const Notification = forwardRef((props, ref) => {
  const [notification, setNotification] = useState(null);
  const notifRef = useRef(null);

  const showNotif = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  useImperativeHandle(ref, () => {
    return { showNotif };
  });

  if (!notification) {
    return null;
  }

  return (
    <div ref={notifRef} className={`notif notif-${notification.type}`}>
      {notification.message}
    </div>
  );
});

Notification.displayName = "Notification";

export default Notification;
