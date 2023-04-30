import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    changeFilter(state, action) {
      const filterText = action.payload;
      state = filterText;
      return state;
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;
