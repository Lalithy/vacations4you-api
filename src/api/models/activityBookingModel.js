const mongoose = require("mongoose");

const activityBookingSchema = mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    activity_id: {
      type: Number,
      required: true,
    },
    number_of_participants: {
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

const ActivityBooking = mongoose.model(
  "ActivityBooking",
  activityBookingSchema
);
module.exports = ActivityBooking;
