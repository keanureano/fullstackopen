import { createContext, useContext, useReducer } from "react";

const notifReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

const NotifContext = createContext();

export const NotifContextProvider = ({ children }) => {
  const [notif, notifDispatch] = useReducer(notifReducer, null);

  return (
    <NotifContext.Provider value={[notif, notifDispatch]}>
      {children}
    </NotifContext.Provider>
  );
};

export const useNotifMessage = () => {
  const [notif] = useContext(NotifContext);
  return notif;
};

export const useNotifDispatch = () => {
  const [, notifDispatch] = useContext(NotifContext);

  const timedNotifDispatch = (message) => {
    notifDispatch({ type: "SET", payload: message });
    setTimeout(() => {
      notifDispatch({ type: "CLEAR" });
    }, 5000);
  };

  return timedNotifDispatch;
};

export default NotifContext;
