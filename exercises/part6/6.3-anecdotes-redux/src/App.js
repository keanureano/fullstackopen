import { useEffect } from "react";
import { useDispatch } from "react-redux";
import anecdoteService from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdoteReducer";

import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteFilter from "./components/AnecdoteFilter";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService.getAll().then((data) => dispatch(setAnecdotes(data)));
  }, [dispatch]);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
