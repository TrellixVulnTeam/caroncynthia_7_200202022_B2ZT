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
        console.log(res.locals.user);
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
        next();
      }
    });
  } else {
    console.log("no token");
  }
};
// module.exports = async (req, res, next) =>{

//  const jwtToken = req.cookies.jwt;

//  if(!jwtToken){
//     return res.status(403).send("Non autorisé")
//     }

//  try{
//  const payload = jwt.verify(jwtToken, process.env.JWTSECRET)

//  req.user = payload.user;
//  next();

//  }catch(err) {
//         console.error(err.message);
//         return res.status(403).send("Non autorisé");
//  }
// }

// module.exports.checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (!token) {
//     return res.sendStatus(403);
//   }
//   try {
//     const data = jwt.verify(token, process.env.JWTSECRET);
//     req.userId = data.id;
//     return next();
//   } catch {
//     return res.senStatus(403);
//   }
// if (token) {
//   jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken) => {
//     if (err) {
//       res.locals.user = null;
//       res.cookies("jwt", "", { maxAge: 1 });
//       next();
//     } else {
//       let user = await pool.query("SELECT * FROM users WHERE user_id =$1", [
//         decodedToken.user_id,
//       ]);
//       res.locals.user = user;
//       console.log(res.locals.user);
//       next();
//     }
//   });
// } else {
//   res.locals.user = null;
//   next();
// }
// };

// module.exports.requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
//       if (err) {
//         console.log(err);
//         res.status(200).json("no token");
//         next();
//       } else {
//         console.log(decodedToken.id);
//         next();
//       }
//     });
//   } else {
//     console.log("No token");
//   }
// };
