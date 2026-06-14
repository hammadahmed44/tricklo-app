// TODO Day 4 — AI generates this schema (study: multi-tenancy, slug generation)
const mongoose = require('mongoose');

// Fields: name, slug (unique, auto-generated), owner (ref User),
// members: [{ user: ref User, role: enum[admin, member] }],
// logo (Cloudinary URL), inviteToken, createdAt

// Interview Q: How does multi-tenancy work in your app?
// Answer: Every document stores workspace reference. All queries filter by workspaceId.
// This is shared-database, shared-schema multi-tenancy. No cross-tenant leakage possible
// because middleware verifies user is a member of the workspace before any operation.

const workspaceSchema = new mongoose.Schema({
  name:   { type: String, required: true, trim: true },
  slug:   { type: String, unique: true, lowercase: true, trim: true },
  owner:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['admin', 'member'], default: 'member' },
  }],
  logo:        { type: String, default: '' },
  inviteToken: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Workspace', workspaceSchema);
