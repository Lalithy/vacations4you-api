require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./api/routes/userRoute");
var cors = require('cors')

const User = require("./api/models/userModel");
const Cruise = require("./api/models/cruiseModel");
const Activity = require("./api/models/activityModel");
const Package = require("./api/models/packageModel");
const CruiseBooking = require("./api/models/cruiseBookingModel");
const ActivityBooking = require("./api/models/activityBookingModel");
const PackageBooking = require("./api/models/packageBookingModel");

const app = express();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

var corsOptions = {
  origin: FRONTEND_URL,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use("/api/user", userRoute);

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

//db connection
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected!"))
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log("Vacation4You API is running on port " + PORT);
});
