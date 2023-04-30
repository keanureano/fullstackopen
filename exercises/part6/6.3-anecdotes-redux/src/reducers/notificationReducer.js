import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      const notificationText = action.payload;
      state = notificationText;
      return state;
    },
    clearNotification(state) {
      state = null;
      return state;
    },
  },
});

let prevNotificationTimer = null;

export const notify =
  (text, duration = 5000) =>
  (dispatch) => {
    clearTimeout(prevNotificationTimer);
    dispatch(setNotification(text));

    prevNotificationTimer = setTimeout(() => {
      dispatch(clearNotification());
    }, duration);
  };

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
