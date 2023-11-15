const express = require("express");
const {
  createPackage,
  getAllPackage,
  getPackageTotalPrice,
  getPackageById,
  getPackageBySearchCriteria,
  updatePackageById,
  removePackageById,
  getDestinations,
  getCategory,
} = require("../controllers/packageController");

const router = express.Router();

router.post("/save", createPackage);
router.get("/getAllPackage", getAllPackage);
router.get("/total-package-price", getPackageTotalPrice);
router.get("/getPackageById:id", getPackageById);
router.post("/getPackageBySearchCriteria", getPackageBySearchCriteria);
router.put("/update/:id", updatePackageById);
router.delete("/delete/:id", removePackageById);
router.get("/getDestinations", getDestinations);
router.get("/getCategory", getCategory);

module.exports = router;
