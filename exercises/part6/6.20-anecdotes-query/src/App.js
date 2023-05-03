import { useQuery } from "react-query";
import Anecdote from "./components/Anecdote";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes } from "./services/anecdotes";

const App = () => {
  const result = useQuery("anecdotes", getAnecdotes, {
    retry: false,
  });

  switch (result.status) {
    case "loading":
      return <div>loading...</div>;
    case "error":
      return <div>anecdote service is not available</div>;
    default:
      break;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  );
};

export default App;
