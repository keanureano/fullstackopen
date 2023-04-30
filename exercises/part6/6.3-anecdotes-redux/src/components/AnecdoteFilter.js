import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

function AnecdoteFilter() {
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    const filter = event.target.value;
    dispatch(filterChange(filter));
  };
  return (
    <div>
      filter
      <input type="text" onChange={changeHandler} />
    </div>
  );
}

export default AnecdoteFilter;
