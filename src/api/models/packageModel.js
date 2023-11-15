const mongoose = require("mongoose");

const packageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    number_of_participants: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image_path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
