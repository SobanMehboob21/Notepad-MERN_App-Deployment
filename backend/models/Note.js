const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 120,
    },
    content: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

// Text index so we can search title + content from one query
noteSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Note", noteSchema);
