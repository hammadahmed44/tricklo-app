// TODO Day 5 — AI generates
const { z } = require('zod');

const createBoardSchema = z.object({
  name: z.string().min(1, 'Board name is required').max(100),
  workspaceId: z.string().min(1, 'Workspace ID is required'),
  visibility: z.enum(['private', 'workspace', 'public']).default('workspace'),
  background: z.string().optional(),
});

module.exports = { createBoardSchema };
