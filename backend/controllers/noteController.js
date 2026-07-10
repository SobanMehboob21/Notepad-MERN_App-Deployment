const Note = require("../models/Note");

// GET /api/notes?search=term
// Returns all notes, or notes matching the search term (title or content)
const getNotes = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i"); // case-insensitive partial match
      query = { $or: [{ title: regex }, { content: regex }] };
    }

    const notes = await Note.find(query).sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes", error: err.message });
  }
};

// GET /api/notes/:id
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch note", error: err.message });
  }
};

// POST /api/notes
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }
    const note = await Note.create({ title: title.trim(), content: content || "" });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: "Failed to create note", error: err.message });
  }
};

// PUT /api/notes/:id
const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ message: "Title cannot be empty" });
    }

    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { ...(title !== undefined && { title: title.trim() }), ...(content !== undefined && { content }) },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update note", error: err.message });
  }
};

// DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete note", error: err.message });
  }
};

module.exports = { getNotes, getNoteById, createNote, updateNote, deleteNote };
