const express = require("express");
const { createActivity } = require("../controllers/activityController");

const router = express.Router();

router.post("/save", createActivity);

module.exports = router;
