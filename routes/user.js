const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizeUser,
} = require("../middlewares/authorizedHandler");
const {
  getAllUser,
  getSingleUser,
  updateProfile,
  updateUserPassword,
  showCurrentUser,
} = require("../controllers/userController");

router.route("/").get([authenticateUser, authorizeUser("admin")], getAllUser);
router.route("/showMe").get([authenticateUser], showCurrentUser);
router
  .route("/:id")
  .get([authenticateUser, authorizeUser("admin")], getSingleUser);
router.route("/updateUserProfile").patch([authenticateUser], updateProfile);
router
  .route("/updateUserPassword")
  .patch([authenticateUser], updateUserPassword);

module.exports = router;
