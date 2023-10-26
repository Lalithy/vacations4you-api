const mongoose = require("mongoose");

const packageBookingSchema = mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    package_id: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PackageBooking = mongoose.model("PackageBooking", packageBookingSchema);
module.exports = PackageBooking;
