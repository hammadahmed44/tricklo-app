const mongoose = require('mongoose');

// Interview Q: What is fractional indexing for position?
// Answer: Instead of [1,2,3,...], use [1024, 2048, 3072].
// Moving a card between positions 1024 and 2048 → new position = (1024+2048)/2 = 1536
// Only ONE document needs updating (the moved card). Not all cards after it.
// No array shifts. Much more efficient for drag-and-drop.

const listSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
    position: { type: Number, required: true },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('List', listSchema);
