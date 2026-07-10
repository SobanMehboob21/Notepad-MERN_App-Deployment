export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <svg
        className="search-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder="Search notes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search notes"
      />
      {value && (
        <button
          className="search-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
}
