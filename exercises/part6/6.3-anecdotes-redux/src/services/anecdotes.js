import axios from "axios";
import anecdoteHelper from "../helpers/anecdoteHelper";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newAnecdote = anecdoteHelper.contentToAnecdote(content);
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const anecdoteService = { getAll, createNew };

export default anecdoteService;
