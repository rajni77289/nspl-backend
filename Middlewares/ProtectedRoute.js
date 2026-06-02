const jwt = require("jsonwebtoken");
console.log("Authorization Header:", req.headers.authorization);
const Users = require("../models/userModel");

const protectRoute = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (decoded) {
        let result = await Users.findOne({ _id: decoded._id });
        req.user = result;
        next();
      } else {
        console.log("err", err);
        next();
      }
    });
    if (!token) {
      res.status({
        status: false,
        msg: "token missing",
      });
      throw new Error("User is not authorized or token is missing");
    }
  } else {
    res.status({
      status: false,
      msg: "something wrong",
    });
  }
};

module.exports = { protectRoute };


// const protectRoute = async (req, res, next) => {
// console.log("Authorization Header:", req.headers.authorization);


//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       status: false,
//       msg: "Token missing",
//     });
//   }

//   const token = authHeader.split(" ")[1];

//   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
//     if (err) {
//       return res.status(401).json({
//         status: false,
//         msg: "Invalid token",
//       });
//     }

//     const user = await Users.findById(decoded._id);
//     req.user = user;
//     next();
//   });
// };