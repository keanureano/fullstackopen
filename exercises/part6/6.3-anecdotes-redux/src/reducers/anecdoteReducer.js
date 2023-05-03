import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = action.payload;
      state.push(newAnecdote);
      return state;
    },
    addVote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1;
      }
      return state;
    },
    setAnecdotes(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
