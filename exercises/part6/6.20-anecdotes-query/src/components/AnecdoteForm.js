import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../services/anecdotes";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const anecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const newAnecdote = {
      content: event.target.anecdote.value,
      votes: 0,
    };

    anecdoteMutation.mutate(newAnecdote);
    console.log("new anecdote", newAnecdote);
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
