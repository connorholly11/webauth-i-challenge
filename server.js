const express = require("express");
const userRouter = require("./data/users/userRouter");

const server = express();

server.use(express.json());
server.use("/api", userRouter);

module.exports = server;
