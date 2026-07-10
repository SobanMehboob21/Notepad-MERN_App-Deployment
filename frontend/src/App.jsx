import { useEffect, useMemo, useState, useCallback } from "react";
import SearchBar from "./components/SearchBar.jsx";
import NoteListItem from "./components/NoteListItem.jsx";
import NoteEditor from "./components/NoteEditor.jsx";
import * as notesApi from "./api.js";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadNotes = useCallback(async (term = "") => {
    try {
      setLoading(true);
      const data = await notesApi.fetchNotes(term);
      setNotes(data);
      setError("");
    } catch (err) {
      setError("Could not reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Debounced search-as-you-type against the backend
  useEffect(() => {
    const handle = setTimeout(() => {
      loadNotes(search);
    }, 300);
    return () => clearTimeout(handle);
  }, [search, loadNotes]);

  const activeNote = useMemo(
    () => notes.find((n) => n._id === activeId) || null,
    [notes, activeId]
  );

  const handleNewNote = async () => {
    try {
      const created = await notesApi.createNote({ title: "Untitled note", content: "" });
      setNotes((prev) => [created, ...prev]);
      setActiveId(created._id);
    } catch (err) {
      setError("Could not create the note.");
    }
  };

  const handleSave = async (payload) => {
    if (!activeId) return;
    try {
      setSaving(true);
      const updated = await notesApi.updateNote(activeId, payload);
      setNotes((prev) =>
        [updated, ...prev.filter((n) => n._id !== updated._id)].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )
      );
      setError("");
    } catch (err) {
      setError("Could not save the note.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await notesApi.deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      if (activeId === id) setActiveId(null);
    } catch (err) {
      setError("Could not delete the note.");
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar__header">
          <h1 className="brand">
            <span className="brand__mark">✎</span> Notepad
          </h1>
          <button className="btn btn--new" onClick={handleNewNote} type="button">
            + New
          </button>
        </div>

        <SearchBar value={search} onChange={setSearch} />

        {error && <div className="banner banner--error">{error}</div>}

        <div className="note-list-wrap">
          {loading ? (
            <p className="sidebar__hint">Loading notes…</p>
          ) : notes.length === 0 ? (
            <p className="sidebar__hint">
              {search ? "No notes match your search." : "No notes yet — create your first one."}
            </p>
          ) : (
            <ul className="note-list">
              {notes.map((note) => (
                <NoteListItem
                  key={note._id}
                  note={note}
                  active={note._id === activeId}
                  onSelect={setActiveId}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          )}
        </div>

        <div className="sidebar__footer">
          {notes.length} note{notes.length !== 1 ? "s" : ""}
        </div>
      </aside>

      <main className="main">
        <NoteEditor
          note={activeNote}
          onSave={handleSave}
          onDelete={handleDelete}
          saving={saving}
        />
      </main>
    </div>
  );
}
