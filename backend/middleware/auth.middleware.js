const jwt = require("jsonwebtoken");
require("dotenv").config();
const pool = require("../dbconnection");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        // res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await pool.query("SELECT * FROM users WHERE user_id =$1", [
          decodedToken.user_id,
        ]);
        res.locals.user = user;
        console.log(res.locals.user.user_id);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken.user_id);
        req.token = decodedToken.user_id;
        req.isadmin = decodedToken.isadmin;
        next();
      }
    });
  } else {
    console.log("no token");
  }
};
