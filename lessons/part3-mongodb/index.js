const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const app = express();
app.use(express.json(), morgan("tiny"));

const password = process.argv[2];
const url = `mongodb+srv://reanokeanu:${password}@cluster0.wehmws4.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model("Note", noteSchema);

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
