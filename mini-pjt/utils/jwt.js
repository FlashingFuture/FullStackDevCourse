require("dotenv").config();

const jwt = require("jsonwebtoken");

function signToken(userEmail) {
  const payload = { userEmail };
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, process.env.PRIVATE_KEY, options);
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.PRIVATE_KEY);
  } catch (err) {
    return null;
  }
}

module.exports = {
  signToken,
  verifyToken,
};
