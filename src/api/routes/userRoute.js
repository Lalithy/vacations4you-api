const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  removeUserById,
} = require("../controllers/userController");

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/:id", getUserById);
router.post("/save", createUser);
router.put("/update/:id", updateUserById);
router.delete("/delete/:id", removeUserById);

module.exports = router;
