const PackageBooking = require("../models/packageBookingModel");
const asyncHandler = require("express-async-handler");

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
  createPackageBooking,
};
