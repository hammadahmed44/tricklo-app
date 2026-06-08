// Consistent response shape across ALL endpoints
// Interviewers ask: how do you standardize API responses?
// Answer: utility functions — every controller calls these, never writes res.json() directly

const success = (res, data = {}, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({ success: true, message, data });
};

const created = (res, data = {}, message = 'Created') => {
  return success(res, data, message, 201);
};

const error = (res, message = 'Something went wrong', statusCode = 400) => {
  return res.status(statusCode).json({ success: false, message });
};

module.exports = { success, created, error };
