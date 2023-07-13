const allowedOrigin = require("./allowOrigin");

const corsOption = {
  credentials: true,
  origin: (origin, callback) => {
    if (allowedOrigin.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOption;
