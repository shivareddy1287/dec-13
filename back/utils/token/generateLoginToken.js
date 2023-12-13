const jwt = require("jsonwebtoken");

const generateLoginToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "20d" });
};

module.exports = generateLoginToken;
