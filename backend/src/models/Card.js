// TODO Day 6 — AI generates this schema (study: embed vs reference decision)
const mongoose = require('mongoose');

// Fields:
//   title, description (rich text HTML), list (ref List), board (ref Board),
//   members: [ObjectId ref User],           ← REFERENCE (users exist independently)
//   labels: [{ text, color }],              ← EMBED (small, always shown with card)
//   checklist: [{ text, done }],            ← EMBED (belongs only to this card)
//   attachments: [{ url, filename, uploadedBy }], ← EMBED (fixed per card)
//   dueDate: Date, position: Number,
//   archived: Boolean, createdBy: ref User, createdAt

// Interview Q: Why embed labels and checklist but reference members and comments?
// Answer:
//   Embed when: data is always needed with parent, 1-to-few, belongs exclusively to parent
//   Reference when: data can grow unbounded (comments), shared across docs (users)
//   Labels & checklist = small, fixed, always loaded with card = EMBED
//   Comments = can be thousands = separate collection = REFERENCE
//   Members = users exist independently on other boards = REFERENCE

const cardSchema = new mongoose.Schema({
  // AI implements on Day 6
});

module.exports = mongoose.model('Card', cardSchema);
