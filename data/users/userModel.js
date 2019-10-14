const db = require("../db.config");

module.exports = {
  addUser
};

function addUser(newUser) {
  db("users").insert(newUser);
}
