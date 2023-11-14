const Activity = require("../models/activityModel");
const asyncHandler = require("express-async-handler");

//create an activity
const createActivity = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(200).json(activity);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//get all activity
const getAllActivity = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.find({});
    res.status(200).json(activity);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//get an activity by id
const getActivityById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) {
      return res
        .status(404)
        .json({ message: "Can not find any activity by id " + id });
    }

    res.status(200).json(activity);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//search activity by filters
const getActivityBySearchCriteria = asyncHandler(async (req, res) => {
  try {
    const { destination, date, activity_type, rating, price } = req.body;

    let query = {};

    if (destination) {
      query.destination = { $regex: new RegExp(destination, 'i') };
    }

    if (date) {
      query.date = { $regex: new RegExp(date, 'i') };
    }

    if (activity_type) {
      query.activity_type = { $regex: new RegExp(activity_type, 'i') };
    }

    if (rating) {
      query.rating = { $regex: new RegExp(rating, 'i') };
    }

    if (price) {
      query.price = price;
    }

    const activity = await Activity.find(query);

    if (activity.length === 0) {
      return res
        .status(200)
        .json({ message: "Can not find any activity by search criteria", records: activity });
    }

    res.status(200).json(activity);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//update an activity by id
const updateActivityById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndUpdate(id, req.body);
    if (!activity) {
      return res
        .status(404)
        .json({ message: "Can not find any activity by id " + id });
    }

    const updatedActivity = await Activity.findById(id);
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//delete an activity
const removeActivityById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);

    if (!activity) {
      return res
        .status(404)
        .json({ message: "Can not find any activity by id " + id });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  createActivity,
  getAllActivity,
  getActivityById,
  getActivityBySearchCriteria,
  updateActivityById,
  removeActivityById
};
