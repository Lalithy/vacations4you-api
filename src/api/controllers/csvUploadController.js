const UploadCruise = require("../models/cruiseModel");
const asyncHandler = require("express-async-handler");
const csvtojson = require("csvtojson");

// Upload from csv cruise data
const uploadCruise = asyncHandler(async (req, res) => {
  try {
    const jsonArray = await csvtojson().fromString(
      req.file.buffer.toString("utf8")
    );
    await UploadCruise.insertMany(jsonArray);
    res.status(200).json({ message: "CSV data successfully uploaded" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  uploadCruise,
};
