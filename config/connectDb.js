const mongo = require("mongoose");
const connectDb = (url) => {
  mongo.connect(url, { family: 4 }, console.log("Database up and running"));
};

module.exports = connectDb;
