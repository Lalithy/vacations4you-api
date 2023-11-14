const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  removeUserById,
  signup,
  login,
  resetUserpassword
} = require("../controllers/userController");

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/:id", getUserById);
router.post("/save", createUser);
router.put("/update/:id", updateUserById);
router.delete("/delete/:id", removeUserById);
router.put("/resetPassword/:id", resetUserpassword);
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
