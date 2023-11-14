const express = require("express");
const { createActivity, getAllActivity, getActivityById, getActivityBySearchCriteria, updateActivityById, removeActivityById } = require("../controllers/activityController");

const router = express.Router();

router.post("/save", createActivity);
router.get("/getAllActivity", getAllActivity);
router.get("/getActivityById:id", getActivityById);
router.post("/getActivityBySearchCriteria", getActivityBySearchCriteria);
router.put("/update/:id", updateActivityById);
router.delete("/delete/:id", removeActivityById);

module.exports = router;
