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

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log(db.findBy({ username }));

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          user: user,
          message: "welcome!"
        });
      } else {
        res.status(401).json({ message: "invalid user credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "500 error logging in a user"
      });
    });
});

router.get("/users", protected, (req, res) => {
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

function protected(req, res, next) {
  const { username, password } = req.headers;

  console.log(db.findBy({ username }));

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).json({ message: "invalid user credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "500 error logging in a user"
      });
    });
}

module.exports = router;
