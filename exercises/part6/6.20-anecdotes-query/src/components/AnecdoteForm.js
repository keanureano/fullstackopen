import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../services/anecdotes";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const anecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const newAnecdote = {
      content: event.target.anecdote.value,
      important: true,
    };
    
    event.target.anecdote.value = "";

    anecdoteMutation.mutate(newAnecdote);
    console.log("new anecdote", newAnecdote);
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
