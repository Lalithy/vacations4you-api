const express = require("express");
const {
  uploadCruise,
  uploadActivity,
  uploadPackage,
} = require("../controllers/csvUploadController");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/cruise", upload.single("csvFile"), uploadCruise);
router.post("/activity", upload.single("csvFile"), uploadActivity);
router.post("/package", upload.single("csvFile"), uploadPackage);

module.exports = router;
