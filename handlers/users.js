const { User } = require("../models");

function createUser(request, response, next) {
  return User.create(request.body.data)
    .then(user => response.status(201).json(user))
    .catch(err => console.error(err));
}

function getUser(request, response, next) {
  const username = request.params.username;
  return response.send("got a user!");
}

function getUsers(request, response, next) {
  return response.send("got all users!!");
}

function updateUser(request, response, next) {
  return response.send("updated user!!!");
}

function deleteUser(request, response, next) {
  return response.send("deleted user!!!??");
}


module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser
};
