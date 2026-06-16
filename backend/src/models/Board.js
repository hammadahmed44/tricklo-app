const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
    members: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        role: { type: String, enum: ['admin', 'member', 'viewer'], default: 'member' },
      },
    ],
    visibility: { type: String, enum: ['private', 'workspace', 'public'], default: 'workspace' },
    background: { type: String, default: '#0079bf' },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Board', boardSchema);
