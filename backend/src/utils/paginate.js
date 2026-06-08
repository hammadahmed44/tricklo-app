// TODO Day 18 — cursor-based pagination
// Interview Q: Why cursor pagination over offset pagination?
// Answer: Offset (skip: 20) re-scans all previous docs on every page → slow at scale.
// If a new card is inserted, offset shifts results → duplicate or skipped items.
// Cursor (after: lastId) fetches only docs AFTER the cursor → consistent, fast, O(log n).

const paginate = async (model, query, { cursor, limit = 20 } = {}) => {
  const filter = { ...query };

  if (cursor) {
    filter._id = { $gt: cursor }; // fetch docs after this ID
  }

  const docs = await model.find(filter).limit(limit + 1).sort({ _id: 1 });
  const hasMore = docs.length > limit;
  const results = hasMore ? docs.slice(0, limit) : docs;
  const nextCursor = hasMore ? results[results.length - 1]._id : null;

  return { results, hasMore, nextCursor };
};

module.exports = paginate;
