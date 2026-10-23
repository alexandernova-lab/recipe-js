const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = (req, res, next) => {
  // Token
  const token = req.cookies.jwt;
  //   Valid
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedValue) => {
      if (err) {
        res.status(401).json({ message: "unauthenticated" });
      } else {
        // Log in user
        User.findById(decodedValue._id).then((user) => {
          req.user = user;
        });
        next();
      }
    });
  } else {
    res.status(400).json({ message: "token need to provide" });
  }
};

module.exports = protect;
