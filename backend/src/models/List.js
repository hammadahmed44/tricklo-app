// TODO Day 5 — AI generates this schema
const mongoose = require('mongoose');

// Fields: name, board (ref Board), position (Number — fractional indexing),
// archived: Boolean

// Interview Q: What is fractional indexing for position?
// Answer: Instead of [1,2,3,...], use [1024, 2048, 3072].
// Moving a card between positions 1024 and 2048 → new position = (1024+2048)/2 = 1536
// Only ONE document needs updating (the moved card). Not all cards after it.
// No array shifts. Much more efficient for drag-and-drop.

const listSchema = new mongoose.Schema({
  // AI implements on Day 5
});

module.exports = mongoose.model('List', listSchema);
