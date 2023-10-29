const mongoose = require("mongoose");

const cruiseBookingSchema = mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    cruise_id: {
      type: Number,
      required: true,
    },
    cabin: {
      type: String,
      required: true,
    },
    deck: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    cruise_provider: {
      type: String,
      required: true,
    },
    number_of_participants: {
      type: Number,
      required: true,
    },
    meal_preference: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    customer_name:{
      type: String,
      required: true,
    },
    customer_address:{
      type: String,
    },
    customer_email:{
      type: String,
    },
    customer_phone_no:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const CruiseBooking = mongoose.model("CruiseBooking", cruiseBookingSchema);
module.exports = CruiseBooking;
