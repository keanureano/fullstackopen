import { createSlice } from "@reduxjs/toolkit";

const getRandomId = () => {
  return (100000 * Math.random()).toFixed(0);
};

const textToAnecdote = (content) => {
  return {
    content: content,
    id: getRandomId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      state.push(textToAnecdote(content));
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
