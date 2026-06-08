// TODO Day 7 — AI generates Socket.io setup, YOU wire the events
// Purpose: real-time board updates — card moves, online presence
//
// Interview Q: Explain your real-time architecture
// Answer (STAR):
//   Situation: Multiple users on same board need to see card moves instantly
//   Task: Real-time sync without polling
//   Action: Socket.io with one room per boardId.
//     - User opens board → socket.join(boardId)
//     - User moves card → API updates DB → emits card.moved to room
//     - All connected users receive event → update their local state
//   Result: Card moves appear in <50ms for all users
//   Scale: Add Redis adapter (pub/sub) so events work across multiple Node instances

const initSocket = (server) => {
  const { Server } = require('socket.io');

  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // TODO: socket.on('board:join', ...)
    // TODO: socket.on('board:leave', ...)
    // TODO: socket.on('disconnect', ...)
  });

  return io;
};

module.exports = { initSocket };
