const UploadCruise = require("../models/cruiseModel");
const UploadActivity = require("../models/activityModel");
const UploadPackage = require("../models/packageModel");
const asyncHandler = require("express-async-handler");
const csvtojson = require("csvtojson");

// Upload from csv cruise data
const uploadCruise = asyncHandler(async (req, res) => {
  try {
    const jsonArray = await csvtojson().fromString(
      req.file.buffer.toString("utf8")
    );
    await UploadCruise.insertMany(jsonArray);
    res.status(200).json({ message: "CSV cruise data successfully uploaded" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Upload from csv activity data
const uploadActivity = asyncHandler(async (req, res) => {
  try {
    const jsonArray = await csvtojson().fromString(
      req.file.buffer.toString("utf8")
    );
    await UploadActivity.insertMany(jsonArray);
    res
      .status(200)
      .json({ message: "CSV activity data successfully uploaded" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Upload from csv package data
const uploadPackage = asyncHandler(async (req, res) => {
  try {
    const jsonArray = await csvtojson().fromString(
      req.file.buffer.toString("utf8")
    );
    await UploadPackage.insertMany(jsonArray);
    res.status(200).json({ message: "CSV package data successfully uploaded" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  uploadCruise,
  uploadActivity,
  uploadPackage,
};
