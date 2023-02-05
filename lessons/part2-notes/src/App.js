import { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    noteService.get().then((data) => {
      setNotes(data);
    });
  }, []);

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    const newNoteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService.create(newNoteObject).then((data) => {
      setNotes(notes.concat(data));
      setNewNote("");
    });
  };

  const toggleImportance = (id) => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(changedNote)
      .then((data) => {
        setNotes(notes.map((note) => (note.id === id ? data : note)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note "${note.content}" was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <form onSubmit={handleNoteSubmit}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
}

function Footer() {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2022
      </em>
    </div>
  );
}

export default App;
