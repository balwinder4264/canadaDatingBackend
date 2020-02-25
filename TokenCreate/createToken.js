const jwt = require("jsonwebtoken");
exports.createToken = (user, secret, expiresIn) => {
  const { username, email, _id } = user;
  return jwt.sign({ username, email, _id }, secret, { expiresIn });
};
