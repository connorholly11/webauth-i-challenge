const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("./userModel");

const router = express.Router();

router.post("/register", (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 12);

  credentials.password = hash;

  db.addUser(credentials)
    .then(user => {
      res.status(201).json(user);
      console.log("registering user success!");
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "500 error adding a user"
      });
    });
});

router.post("/login", (req, res) => {});

router.get("/users", (req, res) => {
  db.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "500 error getting users"
      });
    });
});

module.exports = router;
