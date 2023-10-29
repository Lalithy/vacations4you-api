const express = require("express");
const {
  getAllCruise,
  getCruiseById,
  getCruiseBySearchCriteria,
  createCruise,
  updateCruiseById,
  removeCruiseById,
} = require("../controllers/cruiseController");

const router = express.Router();

router.get("/all", getAllCruise);
router.get("/:id", getCruiseById);
router.get("/", getCruiseBySearchCriteria);
router.post("/save", createCruise);
router.put("/update/:id", updateCruiseById);
router.delete("/delete/:id", removeCruiseById);

module.exports = router;
