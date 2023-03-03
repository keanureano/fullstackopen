const Filter = ({ values, handlers }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={values.filterName} onChange={handlers.filterChange} />
    </div>
  );
};

export default Filter;