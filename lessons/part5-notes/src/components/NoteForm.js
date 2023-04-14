import Togglable from "./Togglable";
const NoteForm = ({
  user,
  handleNoteChange,
  handleNoteSubmit,
  newNote,
  showAll,
  setShowAll,
}) => {
  return (
    <div>
      <p>{user.name} logged in</p>
      <Togglable buttonLabel="new note">
        <h2>Create a new note</h2>

        <form onSubmit={handleNoteSubmit}>
          <input value={newNote} onChange={handleNoteChange} />
          <button type="submit">save</button>
        </form>
      </Togglable>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
    </div>
  );
};

export default NoteForm;
