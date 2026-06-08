// TODO Day 6 — YOU write this
// Key method: move(cardId, newListId, newPosition)
//   - update card.listId and card.position
//   - recalculate fractional index position
//   - emit socket event (Day 7)
//
// Interview Q: How do you handle card position updates efficiently?
// Answer: Fractional indexing — only update the ONE moved card's position.
// If positions get too close (< 1), run a rebalance that resets all positions
// to multiples of 1024. This is rare but handles edge cases.

module.exports = {};
