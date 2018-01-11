const { User } = require("../models");
const { formatResponse } = require("../helpers");

function createUser(request, response, next) {
  return User.create(request.body)
    .then(user => response.status(201).json(formatResponse(user)))
    .catch(err => console.error(err));
}

function getUser(request, response, next) {
  const username = request.params.username;
  return User.findOne({ username })
    .then(user => response.status(200).json(formatResponse(user)))
    .catch(err => console.error(err));
}

function getUsers(request, response, next) {
  return User.find()
    .then(users => response.status(200).json(formatResponse(users)))
    .catch(err => console.error(err));
}

function updateUser(request, response, next) {
  const username = request.params.username;
  return User.findOneAndUpdate({ username }, request.body, { new: true })
    .then(user => response.status(200).json(formatResponse(user)))
    .catch(err => console.error(err));
}

function deleteUser(request, response, next) {
  const username = request.params.username;
  return User.findOneAndRemove({ username })
    .then(() =>
      response.json({
        status: 200,
        title: "Success",
        message: `The operation was successful.`
      })
    )
    .catch(err => console.error(err));
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser
};
