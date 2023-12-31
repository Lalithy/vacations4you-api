require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const userRoute = require("./api/routes/userRoute");
const cruiseRoute = require("./api/routes/cruiseRoute");
const cruiseBookingRoute = require("./api/routes/cruiseBookingRoute");
const activityRoute = require("./api/routes/activityRoute");
const activityBookingRoute = require("./api/routes/activityBookingRoute");
const packageRoute = require("./api/routes/packageRoute");
const packageBookingRoute = require("./api/routes/packageBookingRoute");
const csvUploadRoute = require("./api/routes/csvUploadRoute");

const app = express();

const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

var corsOptions = {
  origin: FRONTEND_URL,
  optionsSuccessStatus: 200,
};

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/user", userRoute);
app.use("/api/cruise", cruiseRoute);
app.use("/api/cruise/booking", cruiseBookingRoute);
app.use("/api/activity", activityRoute);
app.use("/api/activity/booking", activityBookingRoute);
app.use("/api/package", packageRoute);
app.use("/api/package/booking", packageBookingRoute);
app.use("/api/package/upload", csvUploadRoute);

//db connection
mongoose.set("strictQuery", false);
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });


app.listen(PORT, () => {
  console.log("Vacation4You API is running on port " + PORT);
});
