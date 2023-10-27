const express = require("express");
const {
  createActivityBooking,
} = require("../controllers/activityBookingController");

const router = express.Router();

router.post("/save", createActivityBooking);

module.exports = router;
