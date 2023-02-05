function Note({ note, toggleImportance }) {
  const label = note.important ? "make not important" : "make important";
  return (
    <li className="note" style={note.important ? { fontWeight: "bold" } : null}>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
}

export default Note;
