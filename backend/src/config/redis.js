// Redis — EXPLAIN ONLY (no code needed for this project)
// Concept: in-memory data store, sits between app and MongoDB
// Use cases in Taskify:
//   - Session store: JWT refresh tokens (faster lookup, auto-expiry via TTL)
//   - Board caching: cache GET /boards/:id response (5min TTL)
//   - Rate limiting: count requests per IP across multiple Node instances
//   - Socket.io pub/sub: broadcast events across multiple server instances
//
// Cache-aside pattern (most common):
//   1. Check Redis — HIT? Return it.
//   2. MISS? Query MongoDB → store in Redis with TTL → return data
//   3. On update → DELETE the Redis key (cache invalidation)

// If you add Redis later:
// const { createClient } = require('redis');
// const client = createClient({ url: process.env.REDIS_URL });
// client.connect();
// module.exports = client;

module.exports = null; // placeholder
