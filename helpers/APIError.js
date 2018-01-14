class ExtendableError extends Error {
  constructor(status, title, message) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.title = title;
    this.message = message;
    this.isPublic = true;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

class APIError extends ExtendableError {
  constructor(
    status = 500,
    title = "Internal Server Error",
    message = "An unknown server error occurred."
  ) {
    super(status, title, message);
  }
  toJSON() {
    const { status, title, message } = this;
    return {
      error: {
        status,
        title,
        message
      }
    };
  }
}

module.exports = APIError;
