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

//get a cruise by id
const getCruiseBySearchCriteria = asyncHandler(async (req, res) => {
  try {
    const deck = req.query.deck;
    const cabin = req.query.cabin;
    const departure = req.query.departure;
    const arrival = req.query.arrival;
    const departure_date = req.query.departure_date;
    const arrival_date = req.query.arrival_date;

    const cruise = await Cruise.find({
      deck: deck,
      cabin: cabin,
      departure: departure,
      arrival: arrival,
      departure_date: departure_date,
      arrival_date: arrival_date,
    });

    if (cruise.length === 0) {
      return res
        .status(404)
        .json({ message: "Can not find any cruise by search criteria" });
    }

    res.status(200).json(cruise);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
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
