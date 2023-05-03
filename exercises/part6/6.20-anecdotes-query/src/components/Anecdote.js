const Anecdote = ({ anecdote }) => {
  const handleVote = (anecdote) => {
    console.log("vote", anecdote);
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
