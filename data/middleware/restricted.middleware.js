const express = require("express");
const db = require("../users/userModel");
const bcrypt = require("bcryptjs");

module.exports = {
  protected
};

function protected(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "credentials not provided" });
  }
}

// function protected(req, res, next) {
//   const { username, password } = req.headers;

//   if (username && password) {
//     db.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: "invalid user credentials" });
//         }
//       })
//       .catch(error => {
//         res.status(500).json({
//           error: error,
//           message: "500 error logging in a user"
//         });
//       });
//   } else {
//     res.status(401).json({ message: "please provide required fields" });
//   }
// }
