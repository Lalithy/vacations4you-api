const mongoose = require("mongoose");

const cruiseSchema = mongoose.Schema(
  {
    departure: {
      type: String,
      required: true,
    },
    arrival: {
      type: String,
      required: true,
    },
    departure_date: {
      type: Date,
      required: true,
    },
    arrival_date: {
      type: Date,
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
  },
  {
    timestamps: true,
  }
);

const Cruise = mongoose.model("Cruise", cruiseSchema);
module.exports = Cruise;
