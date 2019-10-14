const db = require("../db.config");

module.exports = {
  addUser,
  findBy,
  getUsers
};

function addUser(newUser) {
  return db("users").insert(newUser);
}

function findBy(username) {
  return db("users").where(username);
}

function getUsers() {
  return db("users");
}
