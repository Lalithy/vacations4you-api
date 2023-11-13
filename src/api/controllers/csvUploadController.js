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

    const uniqueJsonArray = [...new Set(jsonArray.map(JSON.stringify))].map(
      JSON.parse
    );

    const existingData = await UploadCruise.find({});

    const newData = uniqueJsonArray.filter((item) => {
      return !existingData.some(
        (existingItem) =>
          existingItem.name === item.name &&
          existingItem.departure === item.departure &&
          existingItem.arrival === item.arrival &&
          existingItem.departure_date === item.departure_date &&
          existingItem.arrival_date === item.arrival_date &&
          existingItem.cabin === item.cabin &&
          existingItem.deck === item.deck &&
          existingItem.cruise_provider === item.cruise_provider &&
          Math.round(existingItem.rating) === Math.round(item.rating) &&
          Math.round(existingItem.price) === Math.round(item.price) &&
          Math.round(existingItem.duration) === Math.round(item.duration)
      );
    });

    if (newData.length > 0) {
      await UploadCruise.insertMany(newData);
      res
        .status(200)
        .json({ message: "CSV cruise data successfully uploaded" });
    } else {
      res.status(200).json({ message: "Not found new data to upload" });
    }
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
