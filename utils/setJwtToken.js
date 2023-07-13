const jwt = require("jsonwebtoken");
const setJwtToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.EXP,
  });
  return token;
};

module.exports = setJwtToken;
