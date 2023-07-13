const Reservation = require("./../models/reservation");
const User = require("./../models/user");

const overview = async (req, res) => {
  const user = await User.countDocuments().where({ role: "user" });
  const allReservation = await Reservation.countDocuments();
  const pendingReservation = await Reservation.countDocuments({
    status: "pending",
  });
  const ongoingReservation = await Reservation.countDocuments({
    status: "ongoing",
  });
  const rejectedReservation = await Reservation.countDocuments({
    status: "rejected",
  });
  const deliveredReservation = await Reservation.countDocuments({
    status: "delivered",
  });

  const today = new Date().getDate();
  console.log(today);
  const pendingReservations = await Reservation.find({
    status: "pending",
  });

  const todayReservation = await Promise.all(
    pendingReservations.map((reservation) => {
      if (new Date(reservation.pickupDate).getDate() == today) {
        return reservation;
      }
    })
  );

  const overviewData = {
    totalUser: user,
    totalReservations: allReservation,
    pending: pendingReservation,
    ongoing: ongoingReservation,
    rejected: rejectedReservation,
    delivered: deliveredReservation,
    todayPickup: todayReservation,
  };

  res.status(200).json(overviewData);
};

module.exports = {
  overview,
};
