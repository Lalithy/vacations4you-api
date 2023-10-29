const express = require("express");
const {
  createPackageBooking,
} = require("../controllers/packageBookingController");

const router = express.Router();

router.post("/save", createPackageBooking);

module.exports = router;
