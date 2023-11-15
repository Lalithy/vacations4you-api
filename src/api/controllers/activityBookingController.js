const ActivityBooking = require("../models/activityBookingModel");
const asyncHandler = require("express-async-handler");

//get all activity booking
const getAllActivityBooking = asyncHandler(async (req, res) => {
  try {
    const activityBooking = await ActivityBooking.find({});
    res.status(200).json(activityBooking);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//get a activity booking by id
const getActivityBookingById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const activityBooking = await ActivityBooking.findById(id);
    if (!activityBooking) {
      return res
        .status(404)
        .json({ message: "Can not find any activity booking by id " + id });
    }

    res.status(200).json(activityBooking);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

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
  getAllActivityBooking,
  createActivityBooking,
  getActivityBookingById
};
