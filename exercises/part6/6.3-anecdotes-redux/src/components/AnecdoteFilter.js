import { useDispatch } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

function AnecdoteFilter() {
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    const filterText = event.target.value;
    dispatch(changeFilter(filterText));
  };
  return (
    <div>
      filter
      <input type="text" onChange={changeHandler} />
    </div>
  );
}

export default AnecdoteFilter;
