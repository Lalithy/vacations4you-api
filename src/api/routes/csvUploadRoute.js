const express = require("express");
const { uploadCruise } = require("../controllers/csvUploadController");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/cruise", upload.single("csvFile"), uploadCruise);

module.exports = router;
