const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_PK } = process.env;
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("Access denied. Login first");
  try {
    const decoded = jwt.verify(token, JWT_PK);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
