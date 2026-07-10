import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/notes";

const api = axios.create({ baseURL: API_BASE });

export const fetchNotes = (search = "") =>
  api.get("/", { params: search ? { search } : {} }).then((res) => res.data);

export const fetchNote = (id) => api.get(`/${id}`).then((res) => res.data);

export const createNote = (note) => api.post("/", note).then((res) => res.data);

export const updateNote = (id, note) => api.put(`/${id}`, note).then((res) => res.data);

export const deleteNote = (id) => api.delete(`/${id}`).then((res) => res.data);
