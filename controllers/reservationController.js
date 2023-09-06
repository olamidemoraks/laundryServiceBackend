const Reservation = require("../models/reservation");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const getUserReservation = async (req, res) => {
  const { userId, external } = req.user;
  // console.log(userId);

  const reservations = await Reservation.find({ userId })
    .sort("-createdAt")
    .exec();
  console.log(userId);
  res.status(StatusCodes.OK).json(reservations);
};

const createReservation = async (req, res) => {
  const userId = req.user.userId;
  const { items, totalAmount, totalItems, pickupDate, pickupTime } = req.body;

  let reservationItem = [];
  for (let item of items) {
    const singleItem = {
      name: item.name,
      image_url: item.image_url,
      quantity: item.quantity,
      price: item.price,
      totalPrice: item.totalPrice,
      category: item.category,
    };

    reservationItem = [...reservationItem, singleItem];
  }

  const reservation = await Reservation.create({
    items: [...reservationItem],
    totalAmount,
    totalItems,
    pickupDate,
    pickupTime,
    userId,
  });
  res.status(StatusCodes.CREATED).json(reservation);
};

const cancelReservation = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const deletedReservation = await Reservation.findByIdAndDelete(
    { _id: id, userId },
    { new: true }
  ).exec();

  res.status(StatusCodes.OK).json(deletedReservation);
};

//Admin rights

const getAllReservation = async (req, res) => {
  const { filter, sort, receipt, page } = req.query;
  let queryObj = {};

  console.log(filter, sort, receipt);

  if (receipt) {
    queryObj.receipt = receipt;
  }

  if (filter) {
    queryObj.status = filter;
  }
  const result = Reservation.find(queryObj);
  if (sort) {
    result.sort(sort);
  }

  const pageNo = Number(page) || 1;
  const limit = 6;
  const skip = (pageNo - 1) * limit;

  result.limit(limit).skip(skip);
  const totalJobs = await Reservation.countDocuments();
  const numOfPage = Math.ceil(totalJobs / limit);

  const reservations = await result.sort("-pickupDate").lean().exec();
  const reservationWithUser = await Promise.all(
    reservations.map(async (reservation) => {
      const user = await User.findById(reservation.userId)
        .select("-password -role")
        .lean()
        .exec();
      return {
        ...user,
        ...reservation,
      };
    })
  );
  res.status(StatusCodes.OK).json({ reservationWithUser, numOfPage });
};

const getReservation = async (req, res) => {
  const { id } = req.params;
  console.log("Id", id);
  const reservation = await Reservation.findOne({ _id: id }).exec();
  const user = await User.findOne({
    $or: [{ _id: reservation.userId }, { externalId: reservation.userId }],
  });
  if (!reservation) {
    throw new NotFoundError("Reservation not found.");
  }
  const userAndReservation = {
    ...user._doc,
    ...reservation._doc,
  };

  console.log(userAndReservation);
  res.status(StatusCodes.OK).json(userAndReservation);
};

const updateReservation = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(status);
  const reservation = await Reservation.findOne({ _id: id }).exec();
  if (!reservation) {
    throw new NotFoundError("Reservation not found.");
  }
  reservation.status = status;
  await reservation.save();
  res.status(StatusCodes.OK).json(reservation);
};

module.exports = {
  createReservation,
  updateReservation,
  getAllReservation,
  cancelReservation,
  getUserReservation,
  getReservation,
};
