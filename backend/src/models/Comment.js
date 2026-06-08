// TODO Day 7 — AI generates this schema
const mongoose = require('mongoose');

// Fields: card (ref Card), author (ref User), text, createdAt, updatedAt

// Interview Q: Why is Comment a separate collection, not embedded in Card?
// Answer: Comments can grow unbounded (a card could have thousands).
// MongoDB document size limit is 16MB. Embedding unbounded arrays risks hitting that.
// Also, comments need to be queried, edited, deleted independently.
// Rule: embed when 1-to-few, reference when 1-to-many or unbounded.

const commentSchema = new mongoose.Schema(
  {
    // AI implements on Day 7
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
