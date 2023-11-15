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
    const { destination, date, activity_type, rating, minPrice, maxPrice } = req.body;

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

    if (minPrice && maxPrice) {
      query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (minPrice) {
      query.price = { $gte: parseFloat(minPrice) };
    } else if (maxPrice) {
      query.price = { $lte: parseFloat(maxPrice) };
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

// Get destinations
const getDestinations = asyncHandler(async (req, res) => {
  try {
    const destinations = await Activity.distinct('destination');

    res.status(200).json({ destinations });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get activity type
const getActivityType = asyncHandler(async (req, res) => {
  try {
    const activityType = await Activity.distinct('activity_type');

    res.status(200).json({ activityType });
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
  removeActivityById,
  getDestinations,
  getActivityType
};
