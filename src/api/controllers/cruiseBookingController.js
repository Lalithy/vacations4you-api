const CruiseBooking = require("../models/cruiseBookingModel");
const asyncHandler = require("express-async-handler");

//get all cruise booking
const getAllCruiseBooking = asyncHandler(async (req, res) => {
  try {
    const cruiseBooking = await CruiseBooking.find({});
    res.status(200).json(cruiseBooking);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//get a cruise booking by id
const getCruiseBookingById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const cruiseBooking = await CruiseBooking.findById(id);
    if (!cruiseBooking) {
      return res
        .status(404)
        .json({ message: "Can not find any cruise booking by id " + id });
    }

    res.status(200).json(cruiseBooking);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//create a cruise booking
const createCruiseBooking = asyncHandler(async (req, res) => {
  try {
    const cruiseBooking = await CruiseBooking.create(req.body);
    res.status(200).json(cruiseBooking);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getAllCruiseBooking,
  getCruiseBookingById,
  createCruiseBooking,
};
