const express = require("express");
const {
  signup,
  signin,
  logout,
  siginWithGoogle,
} = require("../controllers/authController");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/googleSignin").post(siginWithGoogle);
router.route("/logout").post(logout);

module.exports = router;
