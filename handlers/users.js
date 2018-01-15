const { User } = require("../models");
const { formatResponse, parseSkipLimit } = require("../helpers");

// assuming we can make a user witht the data coming in
function createUser(request, response, next) {
  return User.createUser(new User(request.body.data))
    .then(user => response.status(201).json(formatResponse(user)))
    .catch(err => next(err));
}

function getUser(request, response, next) {
  const username = request.params.username;
  return User.getUser(username)
    .then(user => response.status(200).json(formatResponse(user)))
    .catch(err => next(err));
}

async function getUsers(request, response, next) {
  const skip = parseSkipLimit(request.query.skip, null, "skip") || 0;
  const limit = parseSkipLimit(request.query.limit, 50, "limit") || 50;
  if (typeof skip !== "number") {
    return next(skip);
  } else if (typeof limit !== "number") {
    return next(limit);
  }
  try {
    const users = await User.getUsers({}, { password: 0 }, skip, limit);
    return response.json(formatResponse(users));
  } catch (err) {
    return next(err);
  }
}

function updateUser(request, response, next) {
  const { username } = request.params;
  return User.updateUser(username, request.body.data)
    .then(user => response.json(formatResponse(user)))
    .catch(err => next(err));
}

function deleteUser(request, response, next) {
  const username = request.params.username;
  return User.deleteUser(username)
    .then(user => response.json(formatResponse(user)))
    .catch(err => next(err));
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser
};
