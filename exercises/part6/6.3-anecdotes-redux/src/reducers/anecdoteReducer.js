import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      const newAnecdote = action.payload;
      state.push(newAnecdote);
      return state;
    },
    modifyAnecdote(state, action) {
      const changedAnecdote = action.payload;
      const anecdoteToChange = state.find(
        (anecdote) => anecdote.id === changedAnecdote.id
      );
      Object.assign(anecdoteToChange, changedAnecdote);
      return state;
    },
    setAnecdotes(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.addVote(anecdote);
    dispatch(modifyAnecdote(votedAnecdote));
  };
};

export const { appendAnecdote, modifyAnecdote, addVote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
