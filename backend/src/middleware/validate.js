// TODO Day 3 — AI generates Zod schemas, you wire this middleware
// Purpose: validate req.body against a Zod schema before it hits the controller
//
// Usage in routes:
//   router.post('/register', validate(registerSchema), authController.register)
//
// Why Zod over Joi?
//   - TypeScript-first, works great on both frontend and backend
//   - Same schema can be used in React forms (yup/zod) and Express
//   - Smaller bundle, cleaner API

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const message = result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
    return res.status(400).json({ success: false, message });
  }

  req.body = result.data; // use parsed/transformed data
  next();
};

module.exports = validate;
