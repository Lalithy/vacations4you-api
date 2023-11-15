const PackageBooking = require("../models/packageBookingModel");
const asyncHandler = require("express-async-handler");

//get all package booking
const getAllPackageBooking = asyncHandler(async (req, res) => {
  try {
    const packageBooking = await PackageBooking.find({});
    res.status(200).json(packageBooking);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//get a package booking by id
const getPackageBookingById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const packageBooking = await PackageBooking.findById(id);
    if (!packageBooking) {
      return res
        .status(404)
        .json({ message: "Can not find any package booking by id " + id });
    }

    res.status(200).json(packageBooking);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//create a package booking
const createPackageBooking = asyncHandler(async (req, res) => {
  try {
    const packageBooking = await PackageBooking.create(req.body);
    res.status(200).json(packageBooking);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getAllPackageBooking,
  getPackageBookingById,
  createPackageBooking,
};
