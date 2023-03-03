const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", (req, res) => {
  Note.find({}).then((notes) => {
    return res.json(notes);
  });
});

notesRouter.get("/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (!note) {
        return res.status(404).end();
      }
      return res.json(note);
    })
    .catch((error) => next(error));
});

notesRouter.post("/", (req, res, next) => {
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

notesRouter.delete(":id", (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => {
      return res.status(404).end;
    })
    .catch((error) => next(error));
});

notesRouter.put("/:id", (req, res, next) => {
  const body = req.body;
  const note = {
    content: body.content,
    important: body.important,
  };
  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((updatedNote) => {
      return res.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
