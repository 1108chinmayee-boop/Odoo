const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
  sendVerificationEmail,
} = require("../utils/emailService");

const register = async (req, res) => {
  try {
    const {
      employeeId,
      email,
      password,
      firstName,
      lastName,
    } = req.body;

    // 1. Validate required fields
    if (!employeeId || !email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message:
          "Employee ID, email, password, first name and last name are required",
      });
    }

    // 2. Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // 3. Check if employee ID already exists
    const existingEmployee = await Employee.findOne({ employeeId });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: "Employee ID already exists",
      });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

const verificationTokenExpires = new Date(
  Date.now() + 24 * 60 * 60 * 1000
);
    // 5. Create User
    const user = await User.create({
      email,
      password: hashedPassword,
      role: "employee",
      isVerified: false,
      verificationToken,
      verificationTokenExpires,
    });

    // 6. Create Employee profile
    const employee = await Employee.create({
      employeeId,
      userId: user._id,
      firstName,
      lastName,
    });

    // Email verification temporarily disabled for demo
console.log("Verification email skipped for demo:", user.email);

    // 7. Send response
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      employee: {
        id: employee._id,
        employeeId: employee.employeeId,
        firstName: employee.firstName,
        lastName: employee.lastName,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};



//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Find user
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3. Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4. Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // 5. Find employee profile
    const employee = await Employee.findOne({
      userId: user._id,
    });

    // 6. Return response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      employee: employee
        ? {
            id: employee._id,
            employeeId: employee.employeeId,
            firstName: employee.firstName,
            lastName: employee.lastName,
          }
        : null,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required",
      });
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: {
        $gt: new Date(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Email verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during email verification",
    });
  }
};
module.exports = {
  register,
  login,
  verifyEmail,
};