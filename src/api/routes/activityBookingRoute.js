const express = require("express");
const {
  createActivityBooking, getAllActivityBooking, getActivityBookingById,
} = require("../controllers/activityBookingController");

const router = express.Router();

router.get("/getAllActivityBooking", getAllActivityBooking);
router.get("/getActivityBookingById:id", getActivityBookingById);
router.post("/createActivityBooking", createActivityBooking);

module.exports = router;
