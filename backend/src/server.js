const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// http.createServer wraps Express app — required so Socket.io can share the same port (Day 7)
const server = http.createServer(app);

// TODO Day 7: attach Socket.io to server here
// const { initSocket } = require('./sockets/board.socket');
// initSocket(server);

const start = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

// Handle unhandled promise rejections — catches async errors outside request cycle
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

start();
