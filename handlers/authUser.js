const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET_KEY } = require("../config");
const { User } = require("../models");
const { APIError, formatResponse } = require("../helpers");

function authUser(req, res, next) {
  return User.getUser(req.body.data.username)
    .then(user => {
      if (!user) {
        throw new APIError(401, "Unauthorized", "Invalid User");
      }
      const isValidPassword = bcrypt.compare(
        req.body.data.password,
        user.password
      );
      if (!isValidPassword) {
        throw new APIError(
          401,
          "Unauthorized",
          `Invalid Password, ${req.body.data.password}, ${user.username}`
        );
      } else {
        const newToken = {
          token: jwt.sign({ username: user.username }, JWT_SECRET_KEY)
        };
        return res.json(formatResponse(newToken));
      }
    })
    .catch(err => {
      next(err);
    });
}

module.exports = authUser;
