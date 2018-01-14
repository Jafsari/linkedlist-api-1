const APIError = require("./APIError");

function dbError(dbErr) {
  let error = dbErr;
  if (!(error instanceof APIError)) {
    error = new APIError(
      500,
      error.name || "Internal Server Error",
      `Internal Database Error: ${error}`
    );
  }
  return error;
}

module.exports = dbError;
