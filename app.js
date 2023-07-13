require("dotenv").config();
require("express-async-errors");
const express = require("express");
const notFound = require("./middlewares/notFound");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const corsOption = require("./config/corsOption");
const errorHandlersMiddleware = require("./middlewares/errorHandlers");
const connectDb = require("./config/connectDb");
const reserveRoute = require("./routes/reservation");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const overviewRoute = require("./routes/overview");
const app = express();

app.use(express.json());

// search for rate limiter
// app.use(
//   rateLimit({
//     window: 15 * 60 * 1000,
//   })
// );
app.use(cors(corsOption));
// app.use(helmet());
// app.use(xss());
app.use(cookieParser(process.env.JWT_SECRET));
app.use((req, res, next) => {
  console.log(req.method, req.path, req.query);
  next();
});

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api/v1/overview", overviewRoute);
app.use("/api/v1/reservation", reserveRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

app.use(errorHandlersMiddleware);
app.use(notFound);

const PORT = process.env.PORT || 3500;

const start = async () => {
  await connectDb(process.env.CONNECTION_STRING);
  app.listen(PORT, () => {
    console.log("Welcome running on port", PORT);
  });
};
start();
