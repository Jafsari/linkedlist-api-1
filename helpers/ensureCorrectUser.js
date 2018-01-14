const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");
const APIError = require("./APIError");

function ensureCorrectUser(req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(token, JWT_SECRET_KEY, function(err, decoded) {
      if (decoded.username === req.params.username) {
        next();
      } else {
        throw new APIError(401, "Unauthorized", "Invalid Credentials");
      }
    });
  } catch (err) {
    console.log("in the catch");
    throw new APIError(401, "Unauthorized", "Invalid Credentials");
  }
}

module.exports = ensureCorrectUser;
