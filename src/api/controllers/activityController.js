const Activity = require("../models/activityModel");
const asyncHandler = require("express-async-handler");

//create a activity
const createActivity = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(200).json(activity);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  createActivity,
};
