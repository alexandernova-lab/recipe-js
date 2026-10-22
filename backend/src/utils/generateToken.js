const jwt = require("jsonwebtoken");

module.exports = generateToken = (_id) => {
  const maxAge = 3 * 24 * 60 * 60;
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};
