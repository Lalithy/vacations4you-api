const mongoose = require("mongoose");

const activitySchema = mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    activity_type: {
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
    title: {
      type: String,
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

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
