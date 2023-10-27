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

module.exports = {
  createPackage,
};
