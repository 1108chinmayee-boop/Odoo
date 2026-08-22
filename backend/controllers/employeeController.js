const Employee = require("../models/Employee");

// GET logged-in employee profile
const getMyProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      userId: req.user.userId,
    }).populate("userId", "email role");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// UPDATE logged-in employee profile
const updateMyProfile = async (req, res) => {
  try {
    const allowedFields = [
      "firstName",
      "lastName",
      "phone",
      "dateOfBirth",
      "address",
      "profilePicture",
    ];

    const updates = {};

    // Only allow permitted fields
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Prevent empty update
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No permitted fields provided for update",
      });
    }

    const employee = await Employee.findOneAndUpdate(
      {
        userId: req.user.userId,
      },
      {
        $set: updates,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("userId", "email role");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      employee,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
};