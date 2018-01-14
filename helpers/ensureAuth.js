const jwt = require("jsonwebtoken");
const APIError = require("./APIError");
const { JWT_SECRET_KEY } = require("../config");

function ensureAuth(request, response, next) {
  try {
    const token = request.headers.authorization.split(" ")[1];
    jwt.verify(token, JWT_SECRET_KEY);
    return next();
  } catch (err) {
    return next(
      new APIError(401, "Unauthorized", "Missing or invalid auth token.")
    );
  }
}

module.exports = ensureAuth;
