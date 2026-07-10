require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("Notepad API is running.");
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/notepad";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
