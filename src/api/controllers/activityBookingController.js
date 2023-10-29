const ActivityBooking = require("../models/activityBookingModel");
const asyncHandler = require("express-async-handler");

//create a activity booking
const createActivityBooking = asyncHandler(async (req, res) => {
  try {
    const activityBooking = await ActivityBooking.create(req.body);
    res.status(200).json(activityBooking);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  createActivityBooking,
};
