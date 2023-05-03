const getRandomId = () => {
  return (100000 * Math.random()).toFixed(0);
};

const contentToAnecdote = (content) => {
  return {
    content: content,
    id: getRandomId(),
    votes: 0,
  };
};

const anecdoteHelper = { getRandomId, contentToAnecdote };

export default anecdoteHelper;
