# MERN Notepad

A simple notes app with full CRUD, built on MongoDB, Express, React, and Node.
Notes are searched, created, edited, and deleted straight from the database — no local-only state. Styled with plain CSS (no Tailwind), designed like a ruled paper notepad with a dark sidebar.

## Project structure

```
mern-notepad/
  backend/     Express API + Mongoose model
  frontend/    React app (Vite) + plain CSS
```

## Prerequisites

- Node.js 18+
- MongoDB running locally, or a free MongoDB Atlas cluster

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env if your MongoDB URI is different
npm run dev
```

The API runs on `http://localhost:5000` by default. Endpoints:

| Method | Route              | Description                       |
|--------|--------------------|-----------------------------------|
| GET    | /api/notes         | Get all notes                     |
| GET    | /api/notes?search= | Search notes by title/content     |
| GET    | /api/notes/:id     | Get one note                      |
| POST   | /api/notes         | Create a note `{ title, content }`|
| PUT    | /api/notes/:id     | Update a note                     |
| DELETE | /api/notes/:id     | Delete a note                     |

## 2. Frontend setup

In a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
# edit .env if your backend isn't on localhost:5000
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## How it works

- **Create**: "+ New" adds a note straight to MongoDB and opens it in the editor.
- **Edit**: type in the title or the ruled-paper textarea, then hit "Save note" (only enabled once there are unsaved changes).
- **Delete**: the trash icon on a list item, or the "Delete" button in the editor toolbar — both delete permanently from the database.
- **Search**: the sidebar search box queries the backend (debounced) and matches against both title and content.

## Notes on going further

- Add authentication (JWT) if you want notes to be per-user.
- Add optimistic UI updates or an autosave timer instead of a manual Save button.
- Swap manual `fetch`/axios calls for React Query if the app grows.
