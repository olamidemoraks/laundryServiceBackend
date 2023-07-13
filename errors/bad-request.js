const CustomApiError = require("./customApi");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
