import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../services/anecdotes";
import { useNotifDispatch } from "../contexts/NotifContext";

const AnecdoteForm = () => {
  const addNotification = useNotifDispatch();
  const queryClient = useQueryClient();
  const anecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
    onError: () => {
      addNotification("too short anecdote, must have length 5 or more");
    },
  });

  const submitHandler = (event) => {
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
      <form onSubmit={submitHandler}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
