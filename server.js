const express = require("express");
const userRouter = require("./data/users/userRouter");
const session = require("express-session");

const server = express();

const sessionConfig = {
  name: "session",
  secret: "I am a secret",
  cookie: {
    maxAge: 1000 * 10,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false
};

server.use(express.json());
server.use(session(sessionConfig));
server.use("/api", userRouter);

module.exports = server;
