import { useState } from "react";

const NoteForm = ({ addNote, showAll, setShowAll }) => {
  const [newNote, setNewNote] = useState("");
  const handleNoteSubmit = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: true,
    };
    addNote(noteObject);
    setNewNote("");
  };
  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={handleNoteSubmit}>
        <input
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
        />
        <button type="submit">save</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
    </div>
  );
};

export default NoteForm;
