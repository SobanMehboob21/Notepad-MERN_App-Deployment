import { useEffect, useState } from "react";

export default function NoteEditor({ note, onSave, onDelete, saving }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setDirty(false);
  }, [note?._id]);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setDirty(true);
  };

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title, content });
    setDirty(false);
  };

  if (!note) {
    return (
      <div className="editor editor--empty">
        <p className="empty-state__mark">✎</p>
        <h2>Nothing selected yet</h2>
        <p>Pick a note from the list, or start a new one.</p>
      </div>
    );
  }

  return (
    <div className="editor">
      <div className="editor__toolbar">
        <span className={`status-pill ${dirty ? "status-pill--dirty" : "status-pill--saved"}`}>
          {dirty ? "Unsaved changes" : "Saved"}
        </span>
        <div className="editor__actions">
          <button
            className="btn btn--ghost-danger"
            onClick={() => onDelete(note._id)}
            type="button"
          >
            Delete
          </button>
          <button
            className="btn btn--primary"
            onClick={handleSave}
            disabled={!dirty || saving || !title.trim()}
            type="button"
          >
            {saving ? "Saving…" : "Save note"}
          </button>
        </div>
      </div>

      <input
        className="editor__title"
        value={title}
        onChange={handleChange(setTitle)}
        placeholder="Untitled note"
        maxLength={120}
      />

      <div className="editor__paper">
        <textarea
          className="editor__content"
          value={content}
          onChange={handleChange(setContent)}
          placeholder="Start writing..."
          spellCheck={true}
        />
      </div>
    </div>
  );
}
