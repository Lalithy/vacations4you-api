const Cruise = require("../models/cruiseModel");
const asyncHandler = require("express-async-handler");

//get all cruise
const getAllCruise = asyncHandler(async (req, res) => {
  try {
    const cruise = await Cruise.find({});
    res.status(200).json(cruise);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//get a cruise by id
const getCruiseById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const cruise = await Cruise.findById(id);
    if (!cruise) {
      return res
        .status(404)
        .json({ message: "Can not find any cruise by id " + id });
    }

    res.status(200).json(cruise);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// get a cruise by id
const getCruiseBySearchCriteria = asyncHandler(async (req, res) => {
  try {
    const searchParams = {};
    const allowedSearchParams = [
      "deck",
      "cabin",
      "departure",
      "arrival",
      "departure_date",
      "arrival_date",
    ];

    for (const param of allowedSearchParams) {
      if (req.query[param]) {
        searchParams[param] = req.query[param];
      }
    }

    if (Object.keys(searchParams).length === 0) {
      return res
        .status(400)
        .json({ message: "Missing valid search parameters" });
    }

    const cruise = await Cruise.find(searchParams);

    if (cruise.length === 0) {
      return res
        .status(404)
        .json({ message: "Can not find any cruise by search criteria" });
    }

    res.status(200).json(cruise);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
});

//create a cruise
const createCruise = asyncHandler(async (req, res) => {
  try {
    const cruise = await Cruise.create(req.body);
    res.status(200).json(cruise);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//update a cruise by id
const updateCruiseById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const cruise = await Cruise.findByIdAndUpdate(id, req.body);
    if (!cruise) {
      return res
        .status(404)
        .json({ message: "Can not find any cruise by id " + id });
    }

    const updatedCruise = await Cruise.findById(id);
    res.status(200).json(updatedCruise);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//delete a cruise
const removeCruiseById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const cruise = await Cruise.findByIdAndDelete(id);

    if (!cruise) {
      return res
        .status(404)
        .json({ message: "Can not find any cruise by id " + id });
    }
    res.status(200).json(cruise);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getAllCruise,
  getCruiseById,
  getCruiseBySearchCriteria,
  createCruise,
  updateCruiseById,
  removeCruiseById,
};
