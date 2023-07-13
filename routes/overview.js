const express = require("express");
const router = express.Router();

const { overview } = require("../controllers/overviewController");
const {
  authenticateUser,
  authorizeUser,
} = require("../middlewares/authorizedHandler");

router.route("/").get([authenticateUser, authorizeUser("admin")], overview);

module.exports = router;
