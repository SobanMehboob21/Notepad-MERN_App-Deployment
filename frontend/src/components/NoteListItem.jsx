function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function excerpt(text) {
  if (!text) return "No additional text";
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > 60 ? clean.slice(0, 60) + "…" : clean;
}

export default function NoteListItem({ note, active, onSelect, onDelete }) {
  return (
    <li
      className={`note-item ${active ? "note-item--active" : ""}`}
      onClick={() => onSelect(note._id)}
    >
      <div className="note-item__body">
        <p className="note-item__title">{note.title || "Untitled"}</p>
        <p className="note-item__excerpt">{excerpt(note.content)}</p>
        <span className="note-item__date">{formatDate(note.updatedAt)}</span>
      </div>
      <button
        className="note-item__delete"
        title="Delete note"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note._id);
        }}
        type="button"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </button>
    </li>
  );
}
