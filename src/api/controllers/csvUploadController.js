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
      res.status(200).json({ message: "Not found new cruise data to upload" });
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

    const uniqueJsonArray = [...new Set(jsonArray.map(JSON.stringify))].map(
      JSON.parse
    );

    const existingData = await UploadActivity.find({});

    const newData = uniqueJsonArray.filter((item) => {
      return !existingData.some(
        (existingItem) =>
          existingItem.destination === item.destination &&
          existingItem.date === item.date &&
          existingItem.activity_type === item.activity_type &&
          existingItem.title === item.title &&
          Math.round(existingItem.rating) === Math.round(item.rating) &&
          Math.round(existingItem.price) === Math.round(item.price)
      );
    });

    if (newData.length > 0) {
      await UploadActivity.insertMany(newData);
      res
        .status(200)
        .json({ message: "CSV activity data successfully uploaded" });
    } else {
      res
        .status(200)
        .json({ message: "Not found new activity data to upload" });
    }
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

    const uniqueJsonArray = [...new Set(jsonArray.map(JSON.stringify))].map(
      JSON.parse
    );

    const existingData = await UploadPackage.find({});

    const newData = uniqueJsonArray.filter((item) => {
      return !existingData.some(
        (existingItem) =>
          existingItem.title === item.title &&
          existingItem.destination === item.destination &&
          existingItem.category === item.category &&
          existingItem.rating === item.rating &&
          existingItem.duration === item.duration &&
          Math.round(existingItem.number_of_participants) ===
            Math.round(item.number_of_participants) &&
          Math.round(existingItem.price) === Math.round(item.price)
      );
    });

    if (newData.length > 0) {
      await UploadPackage.insertMany(newData);
      res
        .status(200)
        .json({ message: "CSV package data successfully uploaded" });
    } else {
      res.status(200).json({ message: "Not found new package data to upload" });
    }
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
