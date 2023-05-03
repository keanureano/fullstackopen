import axios from "axios";
import anecdoteHelper from "../helpers/anecdoteHelper";

const baseUrl = "http://localhost:3001/anecdotes/";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newAnecdote = anecdoteHelper.contentToAnecdote(content);
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const addVote = async (anecdote) => {
  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  await axios.put(baseUrl + anecdote.id, votedAnecdote);
  return votedAnecdote;
};

const anecdoteService = { getAll, createNew, addVote };

export default anecdoteService;
