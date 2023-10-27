const express = require("express");
const {
  getAllCruise,
  getCruiseById,
  createCruise,
  updateCruiseById,
  removeCruiseById,
} = require("../controllers/cruiseController");

const router = express.Router();

router.get("/all", getAllCruise);
router.get("/:id", getCruiseById);
router.post("/save", createCruise);
router.put("/update/:id", updateCruiseById);
router.delete("/delete/:id", removeCruiseById);

module.exports = router;
