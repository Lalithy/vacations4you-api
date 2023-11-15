const express = require("express");
const {
  createPackageBooking, getPackageBookingById, getAllPackageBooking,
} = require("../controllers/packageBookingController");

const router = express.Router();

router.get("/getAllPackageBooking", getAllPackageBooking);
router.get("/getPackageBookingById:id", getPackageBookingById);
router.post("/createPackageBooking", createPackageBooking);

module.exports = router;
