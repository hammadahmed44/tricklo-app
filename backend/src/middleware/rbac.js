// TODO Day 5 — YOU write this (interview topic: RBAC, authorization vs authentication)
// Purpose: check if req.user has the required role on a workspace or board
//
// Usage in routes:
//   router.delete('/:id', auth, checkRole('admin'), boardController.delete)
//
// Steps to implement:
//   1. Accept required role as argument: checkRole('admin')
//   2. Return middleware function that reads req.user and req.params
//   3. Look up user's role in workspace.members or board.members
//   4. If role is insufficient → 403 Forbidden
//   5. If role is sufficient → next()
//
// Interview Q: What is the difference between authentication and authorization?
// Answer: auth.js = "are you who you say you are?" (verifies JWT)
//         rbac.js = "are you allowed to do this?" (checks role on resource)
//         They are ALWAYS separate — composed together in route definitions.

const checkRole = (...roles) => {
  return async (req, res, next) => {
    next(); // remove this when you implement
  };
};

module.exports = { checkRole };
