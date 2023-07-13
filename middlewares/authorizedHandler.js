const CustomError = require("../errors");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  let token;
  // token = req.signedCookies.token;
  if (!token || token === undefined) {
    const authHeader = req.headers.authorization;
    console.log(req.headers.authorization);
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new CustomError.UnauthenticateError("Authentication invalid");
    }
    token = authHeader.split(" ")[1];
  }
  // console.log(token);
  const isCustomAuth = token.length < 500;

  if (isCustomAuth) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) throw new CustomError.UnauthenticateError("Forbidden");

      req.user = {
        external: false,
        userId: decode.userId,
        role: decode.role,
      };
      next();
    });
  } else {
    const { sub } = jwt.decode(token);
    if (!sub) {
      throw new CustomError.UnauthenticateError("Forbidden");
    }
    req.user = {
      external: true,
      userId: sub,
      role: "user",
    };
    next();
  }
};

const authorizeUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  authorizeUser,
  authenticateUser,
};
