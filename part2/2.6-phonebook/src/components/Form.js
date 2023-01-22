const Form = ({ values, handlers }) => {
  return (
    <form onSubmit={handlers.formSubmit}>
      <div>
        name: <input value={values.newName} onChange={handlers.nameChange} />
      </div>
      <div>
        number:{" "}
        <input value={values.newNumber} onChange={handlers.numberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
