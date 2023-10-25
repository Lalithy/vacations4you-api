const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const Cruise = require("./models/cruiseModel");
const Activity = require("./models/activityModel");
const Package = require("./models/packageModel");
const CruiseBooking = require("./models/cruiseBookingModel");
const ActivityBooking = require("./models/activityBookingModel");
const PackageBooking = require("./models/packageBookingModel");
const app = express();

require("dotenv/config");

app.use(express.json());

//create a user
app.post("/user/save", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//create a cruise
app.post("/cruise/save", async (req, res) => {
  try {
    const cruise = await Cruise.create(req.body);
    res.status(200).json(cruise);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//create a activity
app.post("/activity/save", async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(200).json(activity);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//create a package
app.post("/package/save", async (req, res) => {
  try {
    const package = await Package.create(req.body);
    res.status(200).json(package);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//create a cruise booking
app.post("/cruise/booking", async (req, res) => {
  try {
    const cruiseBooking = await CruiseBooking.create(req.body);
    res.status(200).json(cruiseBooking);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//create a activity booking
app.post("/activity/booking", async (req, res) => {
  try {
    const activityBooking = await ActivityBooking.create(req.body);
    res.status(200).json(activityBooking);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//create a package booking
app.post("/package/booking", async (req, res) => {
  try {
    const packageBooking = await PackageBooking.create(req.body);
    res.status(200).json(packageBooking);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//DB connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECTION)
.then(() => console.log("Connected!")).catch((error) => {
    console.log(error);
  });


app.listen(process.env.PORT, () => {
  console.log("Vacation4You API is running on port " + process.env.PORT);
});
