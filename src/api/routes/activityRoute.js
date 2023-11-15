const express = require("express");
const { createActivity, getAllActivity, getActivityById, getActivityBySearchCriteria, updateActivityById, removeActivityById, getDestinations, getActivityType, getActivityTotalPrice } = require("../controllers/activityController");

const router = express.Router();

router.post("/save", createActivity);
router.get("/getAllActivity", getAllActivity);
router.get("/total-activity-price", getActivityTotalPrice);
router.get("/getActivityById:id", getActivityById);
router.post("/getActivityBySearchCriteria", getActivityBySearchCriteria);
router.put("/update/:id", updateActivityById);
router.delete("/delete/:id", removeActivityById);
router.get("/getDestinations", getDestinations);
router.get("/getActivityType", getActivityType);

module.exports = router;
