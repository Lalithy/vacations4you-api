const express = require("express");
const {
  getAllCruiseBooking,
  getCruiseBookingById,
  createCruiseBooking,
} = require("../controllers/cruiseBookingController");

const router = express.Router();

router.get("/all", getAllCruiseBooking);
router.get("/:id", getCruiseBookingById);
router.post("/save", createCruiseBooking);

module.exports = router;
