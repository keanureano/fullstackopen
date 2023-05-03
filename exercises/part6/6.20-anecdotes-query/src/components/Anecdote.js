import { useMutation, useQueryClient } from "react-query";
import { updateAnecdote } from "../services/anecdotes";

const Anecdote = ({ anecdote }) => {
  const queryClient = useQueryClient();
  const anecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      const updatedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
      queryClient.setQueryData("anecdotes", updatedAnecdotes);
    },
  });

  const handleVote = (anecdote) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    anecdoteMutation.mutate(votedAnecdote);
    console.log("voted anecdote", votedAnecdote);
  };

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
