const mongoose = require("mongoose");

const cruiseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image_path: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    departure: {
      type: String,
      required: true,
    },
    arrival: {
      type: String,
      required: true,
    },
    departure_date: {
      type: String,
      required: true,
    },
    arrival_date: {
      type: String,
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
    meal: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Cruise = mongoose.model("Cruise", cruiseSchema);
module.exports = Cruise;
