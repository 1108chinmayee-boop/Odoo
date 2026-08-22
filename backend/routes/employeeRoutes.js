const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getMyProfile,
  updateMyProfile,
} = require("../controllers/employeeController");

const router = express.Router();

// View own profile
router.get(
  "/me",
  authMiddleware,
  getMyProfile
);

// Update own permitted profile fields
router.put(
  "/me",
  authMiddleware,
  updateMyProfile
);

// Admin/HR test
router.get(
  "/admin-test",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "You have Admin/HR access",
      role: req.user.role,
    });
  }
);

module.exports = router;