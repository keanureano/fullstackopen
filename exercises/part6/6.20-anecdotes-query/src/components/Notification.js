import { useNotifMessage } from "../contexts/NotifContext";

const Notification = () => {
  const notifMessage = useNotifMessage();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!notifMessage) return null;

  return <div style={style}>{notifMessage}</div>;
};

export default Notification;
