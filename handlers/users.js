const { User } = require("../models");
const { formatResponse } = require('../helpers')

function createUser(request, response, next) {
  return User.create(request.body)
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
  const username = request.params.username;
  return User.findOneAndRemove(username)
    .then(() => response.json({
          status: 200,
          title: 'Success',
          message: `The operation was successful.`
        })
    .catch(err => console.error(err));
  // return response.send("deleted user!!!??");
}


module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser
};
