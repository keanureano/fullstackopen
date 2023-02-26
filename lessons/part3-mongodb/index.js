require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Note = require("./models/note");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

// get all notes
app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    return res.json(notes);
  });
});

// get note
app.get("/api/notes/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (!note) {
        return res.status(404).end();
      }
      return res.json(note);
    })
    .catch((error) => next(error));
});

// add note
app.post("/api/notes", (req, res, next) => {
  const body = req.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      return res.json(savedNote);
    })
    .catch((error) => next(error));
});

// delete note
app.delete("/api/notes/:id", (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then((result) => {
      return res.status(204).end();
    })
    .catch((error) => next(error));
});

// update note
app.put("/api/notes/:id", (req, res, next) => {
  const body = req.body;
  const note = {
    content: body.content,
    important: body.important,
  };
  Note.findByIdAndUpdate(req.params.id, note, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedNote) => {
      return res.json(updatedNote);
    })
    .catch((error) => next(error));
});

// unknown endpoint handler
const unknownEndpoint = (req, res) => {
  return res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// error handler
const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

// open port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
