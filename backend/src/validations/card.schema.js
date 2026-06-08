// TODO Day 6 — AI generates
const { z } = require('zod');

const createCardSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  listId: z.string().min(1, 'List ID is required'),
  boardId: z.string().min(1, 'Board ID is required'),
});

const moveCardSchema = z.object({
  newListId: z.string().min(1, 'New list ID is required'),
  newPosition: z.number().positive(),
});

module.exports = { createCardSchema, moveCardSchema };
