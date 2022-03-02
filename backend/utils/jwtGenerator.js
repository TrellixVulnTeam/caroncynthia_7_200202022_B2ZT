const jwt = require("jsonwebtoken");
require("dotenv").config();

const maxAge = 3 * 24 * 60 * 60 * 1000;
function createToken(user_id) {
  const payload = {
    user: user_id,
  };
  return jwt.sign({ user_id }, process.env.JWTSECRET, {
    expiresIn: maxAge,
  });
}

module.exports = createToken;
