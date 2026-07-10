const express = require("express");
const router = express.Router();
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

router.get("/", getNotes);        // GET    /api/notes?search=term
router.get("/:id", getNoteById);  // GET    /api/notes/:id
router.post("/", createNote);     // POST   /api/notes
router.put("/:id", updateNote);   // PUT    /api/notes/:id
router.delete("/:id", deleteNote);// DELETE /api/notes/:id

module.exports = router;
