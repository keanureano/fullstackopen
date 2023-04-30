import { useSelector } from "react-redux";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const filterAnecdotes = (filter, anecdotes) => {
      if (filter.trim() === "") {
        return anecdotes;
      }

      const matchingAnecdotes = anecdotes.filter((anecdote) => {
        const cleanedAnecdoteContent = anecdote.content.toLowerCase();
        const cleanedFilterText = filter.trim().toLowerCase();

        return cleanedAnecdoteContent.includes(cleanedFilterText);
      });

      return matchingAnecdotes;
    };

    const sortAnecdotes = (anecdotes) => {
      const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

      return sortedAnecdotes;
    };

    const filteredAnecdotes = filterAnecdotes(filter, anecdotes);
    const sortedAnecdotes = sortAnecdotes(filteredAnecdotes);

    return sortedAnecdotes;
  });

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  );
};

export default AnecdoteList;
