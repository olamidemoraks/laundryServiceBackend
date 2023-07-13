const BadRequestError = require("./bad-request");
const NotFoundError = require("./not-found");
const UnauthenticateError = require("./unauthenticated");
const UnauthorizedError = require("./unauthorized");
const CustomApiError = require("./customApi");

module.exports = {
  UnauthorizedError,
  CustomApiError,
  NotFoundError,
  BadRequestError,
  UnauthenticateError,
};
