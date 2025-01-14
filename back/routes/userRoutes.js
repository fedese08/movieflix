const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerUser,
  loginUser,
  getUserDetails,
  updateUserLists,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserDetails);
router.put("/:id", updateUserLists);
router.delete("/:id", deleteUser);

module.exports = router;
