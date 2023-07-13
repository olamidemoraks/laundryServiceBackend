const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const itemScheme = new mongoose.Schema({
  name: { type: String, required: true },
  image_url: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  category: { type: String, required: true },
});

const reservationScheme = new mongoose.Schema(
  {
    items: [itemScheme],
    pickupDate: {
      type: Date,
      required: [true, "please choose a pickup date"],
    },
    pickupTime: {
      type: String,
      required: [true, "please choose a pickup Time"],
    },
    totalAmount: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    discount: { type: Number },
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "rejected", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

reservationScheme.plugin(AutoIncrement, {
  inc_field: "receipt",
  id: "receiptNum",
  start_seq: 500,
});

module.exports = mongoose.model("Reservation", reservationScheme);
