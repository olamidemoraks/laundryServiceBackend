const express = require("express");
const router = express.Router();
const {
  createReservation,
  updateReservation,
  getAllReservation,
  cancelReservation,
  getUserReservation,
  getReservation,
} = require("../controllers/reservationController");
const {
  authenticateUser,
  authorizeUser,
} = require("../middlewares/authorizedHandler");

router
  .route("/")
  .post(authenticateUser, createReservation)
  .get(authenticateUser, getUserReservation);
router.route("/").post(authenticateUser, createReservation);

router
  .route("/getall")
  .get([authenticateUser, authorizeUser("admin")], getAllReservation);
router
  .route("/:id")
  .patch([authenticateUser, authorizeUser("admin")], updateReservation)
  .get(authenticateUser, getReservation)
  .delete(authenticateUser, cancelReservation);

module.exports = router;
