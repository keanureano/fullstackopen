import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    const content = event.target.content.value;
    event.target.content.value = "";

    anecdoteService.createNew(content).then((data) => {
      dispatch(createAnecdote(data));
    });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitHandler}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
