const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ err: result.mapped() });
  } else {
    next();
  }
};

module.exports = validateRequest;
