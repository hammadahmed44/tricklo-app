require('dotenv').config();
require('express-async-errors'); // patches async route handlers — no try/catch needed

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security headers (sets X-Frame-Options, X-XSS-Protection, etc.)
app.use(helmet());

// CORS — credentials:true is required for httpOnly cookies to be sent cross-origin
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Request logging — 'dev' format: method, url, status, response-time
app.use(morgan('dev'));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // needed to read req.cookies for refresh token

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/health', healthRoutes);

app.use('/api/auth', authRoutes);
// TODO Day 4: app.use('/api/workspaces', workspaceRoutes);
// TODO Day 5: app.use('/api/boards', boardRoutes);
// TODO Day 5: app.use('/api/lists', listRoutes);
// TODO Day 6: app.use('/api/cards', cardRoutes);
// TODO Day 16: app.use('/api/upload', uploadRoutes);

// 404 — must come after all routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global error handler — MUST be the LAST middleware (4 params = error middleware)
app.use(errorHandler);

module.exports = app;
