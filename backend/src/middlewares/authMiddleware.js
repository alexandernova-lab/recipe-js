const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // Token
  const token = req.cookies.jwt;
  //   Valid
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedValue) => {
      if (err) {
        res.status(401).json({ message: "unauthenticated" });
      } else {
        next();
      }
    });
  } else {
    res.status(400).json({ message: "token need to provide" });
  }
};

module.exports = protect;
