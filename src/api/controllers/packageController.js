const Package = require("../models/packageModel");
const asyncHandler = require("express-async-handler");

//create a package
const createPackage = asyncHandler(async (req, res) => {
  try {
    const package = await Package.create(req.body);
    res.status(200).json(package);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//get all package
const getAllPackage = asyncHandler(async (req, res) => {
  try {
    const package = await Package.find({});
    res.status(200).json(package);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//get a package by id
const getPackageById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const package = await Package.findById(id);
    if (!package) {
      return res
        .status(404)
        .json({ message: "Can not find any package by id " + id });
    }

    res.status(200).json(package);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//search package by filters
const getPackageBySearchCriteria = asyncHandler(async (req, res) => {
  try {
    const { destination, duration, number_of_participants, category, minPrice, maxPrice, rating } = req.body;

    let query = {};

    if (destination) {
      query.destination = { $regex: new RegExp(destination, 'i') };
    }

    if (duration) {
      query.duration = { $regex: new RegExp(duration, 'i') };
    }

    if (number_of_participants) {
      query.number_of_participants = number_of_participants;
    }

    if (category) {
      query.category = { $regex: new RegExp(category, 'i') };
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (minPrice) {
      query.price = { $gte: parseFloat(minPrice) };
    } else if (maxPrice) {
      query.price = { $lte: parseFloat(maxPrice) };
    }

    if (rating) {
      query.rating = { $regex: new RegExp(rating, 'i') };
    }

    const package = await Package.find(query);

    if (package.length === 0) {
      return res
        .status(200)
        .json({ message: "Can not find any package by search criteria", records: package });
    }

    res.status(200).json(package);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//update an package by id
const updatePackageById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const package = await Package.findByIdAndUpdate(id, req.body);
    if (!package) {
      return res
        .status(404)
        .json({ message: "Can not find any package by id " + id });
    }

    const updatedPackage = await Package.findById(id);
    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//delete an package
const removePackageById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const package = await Package.findByIdAndDelete(id);

    if (!package) {
      return res
        .status(404)
        .json({ message: "Can not find any package by id " + id });
    }
    res.status(200).json(package);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get destinations
const getDestinations = asyncHandler(async (req, res) => {
  try {
    const destinations = await Package.distinct('destination');

    res.status(200).json({ destinations });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get category
const getCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Package.distinct('category');

    res.status(200).json({ categories });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  createPackage,
  getAllPackage,
  getPackageById,
  getPackageBySearchCriteria,
  updatePackageById,
  removePackageById,
  getDestinations,
  getCategory
};
