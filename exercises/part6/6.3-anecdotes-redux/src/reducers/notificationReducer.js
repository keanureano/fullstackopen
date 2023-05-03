import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    addNotification(state, action) {
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

export const setNotification = (text, duration = 5) => {
  const durationInMs = duration * 1000;
  return async (dispatch) => {
    clearTimeout(prevNotificationTimer);
    dispatch(addNotification(text));

    prevNotificationTimer = setTimeout(() => {
      dispatch(clearNotification());
    }, durationInMs);
  };
};

export const { addNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
