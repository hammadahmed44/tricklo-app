// TODO Day 5 — AI generates this schema
const mongoose = require('mongoose');

// Fields: name, workspace (ref Workspace), members: [{ user, role }],
// visibility: enum[private, workspace, public], background (hex or image URL),
// archived: Boolean, createdAt

const boardSchema = new mongoose.Schema({
  // AI implements on Day 5
});

module.exports = mongoose.model('Board', boardSchema);
